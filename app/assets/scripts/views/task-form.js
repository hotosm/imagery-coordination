'use strict';
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import moment from 'moment';
import _ from 'lodash';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import { DOMParser } from 'xmldom';

import toGeoJSON from '../utils/togeojson';
import { validateGeoJSONPolygon } from '../utils/features';

momentLocalizer(moment);

import { fetchTask, invalidateTask, postTask, patchTask, resetTaskFrom,
  fetchRequest, invalidateRequest, deleteTask, fetchRequestTasks } from '../actions';
import { receiveUpload } from '../actions/map-actions';
import EditMap from '../components/edit-map';
import EditStatus from '../components/edit-status';
import TaskSizeWarning from '../components/task-size-warning.js';

var TaskForm = React.createClass({
  displayName: 'TaskForm',

  propTypes: {
    _fetchTask: T.func,
    _invalidateTask: T.func,
    _postTask: T.func,
    _patchTask: T.func,
    _resetTaskFrom: T.func,
    _fetchRequest: T.func,
    _invalidateRequest: T.func,
    _deleteTask: T.func,
    _fetchRequestTasks: T.func,
    _receiveUpload: T.func.isRequired,

    params: T.object,
    task: T.object,
    requestTasks: T.object,
    request: T.object,
    taskForm: T.object,
    users: T.object,
    user: T.object,
    taskGeojson: T.object
  },

  getInitialState: function () {
    return {
      data: {
        name: '',
        geometry: '',
        assigneeId: '',
        deliveryTime: null,
        timePeriodProvidedFrom: null,
        timePeriodProvidedTo: null
      },
      errors: {}
    };
  },

  goToTaskForm: false,

  checkErrors: function () {
    let control = true;
    let errors = {};

    if (this.state.data.name === '') {
      errors.name = true;
      control = false;
    }

    if (!this.getFormGeometryData(this.props.taskGeojson)) {
      errors.geometry = true;
      control = false;
    }

    this.setState({errors});
    return control;
  },

  onSave: function (e) {
    this.goToTaskForm = false;
    this.onFormSubmit(e);
  },

  onSaveAndAdd: function (e) {
    this.goToTaskForm = true;
    this.onFormSubmit(e);
  },

  onFormSubmit: function (e) {
    e.preventDefault();

    if (this.checkErrors()) {
      var payload = {
        name: this.state.data.name,
        geometry: this.getFormGeometryData(this.props.taskGeojson),
        assigneeId: this.state.data.assigneeId || null,
        timePeriodProvidedFrom: this.state.data.timePeriodProvidedFrom
          ? moment(this.state.data.timePeriodProvidedFrom).format('YYYY-MM-DD')
          : null,
        timePeriodProvidedTo: this.state.data.timePeriodProvidedTo
          ? moment(this.state.data.timePeriodProvidedTo).format('YYYY-MM-DD')
          : null,
        deliveryTime: this.state.data.deliveryTime
          ? moment(this.state.data.deliveryTime).format('YYYY-MM-DD')
          : null
      };

      if (this.props.params.taskid) {
        this.props._patchTask(this.props.params.reqid, this.props.params.taskid, payload);
      } else {
        // On create we only want to send properties that were filled in.
        payload = _.pickBy(payload, v => v !== null);
        this.props._postTask(this.props.params.reqid, payload);
      }

      // Reset the form.
      this.setState({data: this.getInitialState().data});
    }
  },

  getValueForDate: function (field, value) {
    return this.state.data[field] === null ? null : new Date(this.state.data[field]);
  },

  dateOrUndefined: function (field) {
    // When getting the value for min/max, if we don't want to set one
    // we need to use undefined.
    // Using null results in the date being the epoch time.
    return this.getValueForDate(field) || undefined;
  },

  onDateChange: function (field, date, dateString) {
    var val = date === null ? null : date.toISOString();
    let data = Object.assign({}, this.state.data, {[field]: val});
    this.setState({data});
  },

  onFieldChange: function (field, e) {
    let data = Object.assign({}, this.state.data, {[field]: e.target.value});
    this.setState({data});
  },

  onFileChange: function (e) {
    let reader = new FileReader();
    let file = e.target.files[0];

    if (!file.name.match(/(\.geojson|\.json|\.kml)$/i)) {
      let err = Object.assign({}, this.state.errors);
      err.geometryFile = 'Invalid file format. Please upload a GeoJSON or KML file.';
      this.setState({errors: err});
      return;
    }

    var isKML = !!file.name.match(/\.kml$/i);

    reader.onload = (e) => {
      let errors = Object.assign({}, this.state.errors);
      try {
        let geojson;
        if (isKML) {
          var kml = new DOMParser().parseFromString(reader.result);
          geojson = toGeoJSON.kml(kml);
        } else {
          geojson = JSON.parse(reader.result);
        }
        validateGeoJSONPolygon(geojson, (err, res) => {
          if (err) {
            if (isKML) {
              errors.geometryFile = 'The KML file is not properly formatted. Please ensure that it only includes one polygon.';
            } else {
              errors.geometryFile = err;
            }
            this.setState({errors: errors});
          } else {
            this.props._receiveUpload(res);
            errors.geometryFile = null;
            errors.geometry = null;
            this.setState({ errors: errors });
          }
        });
      } catch (e) {
        errors.geometryFile = 'File is not properly formatted. Needs to be a valid GeoJSON or KML.';
        this.setState({errors: errors});
      }
    };
    reader.readAsText(file);
  },

  getFormGeometryData: function (geojson) {
    let coords;
    if (geojson && geojson.geometry && geojson.geometry.coordinates) {
      coords = geojson.geometry.coordinates[0];
    }
    return coords;
  },

  onDeleteClick: function (e) {
    e.preventDefault();

    let msg = `Are you sure you want to delete ${this.props.task.data.name}?
This action is permanent.`;

    if (confirm(msg)) {
      this.props._deleteTask(this.props.params.reqid, this.props.params.taskid);
      hashHistory.push(`/requests/${this.props.params.reqid}`);
    }
  },

  componentDidMount: function () {
    // If we're editing a task, the we have the request info from the
    // task itself, otherwise we need to get the request data as well.
    if (this.props.params.taskid) {
      this.props._fetchTask(this.props.params.reqid, this.props.params.taskid);
    } else {
      this.props._fetchRequest(this.props.params.reqid);
    }

    this.props._fetchRequestTasks(this.props.params.reqid);
  },

  componentWillUnmount: function () {
    this.props._invalidateTask();
    this.props._invalidateRequest();
    this.props._resetTaskFrom();
  },

  componentWillReceiveProps: function (nextProps) {
    // When editing a task we need to put the data in the state as soon as
    // it is loaded. only in this way can we access it in the fields.
    let { fetched: prevfetched, fetching: prevfetching } = this.props.task;
    let { fetched, fetching, error, data } = nextProps.task;

    // If it was fetching and now it's not.
    if (!prevfetched && prevfetching && fetched && !fetching && !error) {
      // Now that we have the data check for permissions.
      // A surveyor can only edit a task if he's assigned.
      let isSurveyor = this.props.user.profile.roles.indexOf('surveyor') !== -1;
      if (isSurveyor) {
        if (this.props.user.profile.user_id !== data.assigneeId) {
          return hashHistory.push(`/`);
        }
      }

      let loadedData = {};
      Object.keys(this.state.data).forEach(k => {
        loadedData[k] = data[k] === null ? '' : data[k];
      });
      // These two are different.
      loadedData.timePeriodProvidedFrom = data.timePeriodProvided.from;
      loadedData.timePeriodProvidedTo = data.timePeriodProvided.to;
      // Since it's a date, deliveryTime has to be null.
      loadedData.deliveryTime = loadedData.deliveryTime || null;
      loadedData.geometry = this.getFormGeometryData(nextProps.taskGeojson);
      this.setState({data: loadedData});
    }

    let prevProcessing = this.props.taskForm.processing;
    let {processing, data: newTask} = nextProps.taskForm;
    // Result came back.
    if (prevProcessing && !processing && newTask._id) {
      if (this.goToTaskForm) {
        this.props._fetchRequestTasks(this.props.params.reqid);
        if (this.props.params.taskid) {
          // If we were editing a task the url is different.
          hashHistory.push(`/requests/${newTask.requestId}/tasks/edit`);
        } else {
          // If not, reset the page.
          this.goToTaskForm = false;
          this.refs.form.reset();
          this.setState(this.getInitialState());
        }
      } else {
        hashHistory.push(`/requests/${newTask.requestId}/tasks/${newTask._id}`);
      }
    }
  },

  renderFrom: function (data = {}) {
    let editing = !!this.props.params.taskid;
    return (
      <div className='task-form'>
        <form ref='form' className='form'>
          <div className='form__group'>
            <label className='form__label'>Define the area of interest to collect</label>
            <p className='form__help'>Draw the area of interest on the map below or upload a file (KML and GeoJSON format only).</p>
            <input type='file' name='task-area-file' onChange={this.onFileChange} />
            {this.state.errors.geometryFile
              ? <p className='message message--alert'>{this.state.errors.geometryFile}</p>
              : null
            }
          </div>
          <div className='form__group'>
            <TaskSizeWarning/>
            <EditStatus/>
          </div>
          <EditMap
            mapId='map-task-edit'
            className='map-container map-container--edit bleed-full' />

          {this.state.errors.geometry
            ? <p className='message message--alert'>A task polygon is needed. Draw one or provide a file.</p>
            : null
          }

          <div className='form__group'>
            <label className='form__label' htmlFor='task-name'>Task name <small>(required)</small></label>
            <input type='text' className='form__control form__control--medium' id='task-name' name='task-name' placeholder='Task name'
                value={this.state.data.name} onChange={this.onFieldChange.bind(null, 'name')} />
            {this.state.errors.name
              ? <p className='message message--alert'>A name is required</p>
              : null
            }
          </div>
          <div className='form__group'>
            <label className='form__label'>To deliver by</label>
            <DateTimePicker
              min={new Date()}
              finalView='decade'
              format={'YYYY-MM-DD'}
              value={this.getValueForDate('deliveryTime')}
              time={false}
              onChange={this.onDateChange.bind(null, 'deliveryTime')} />
          </div>
          <div className='form__group'>
            <label className='form__label' htmlFor='task-assignee'>Assignee</label>
            <select className='form__control form__control--medium' id='task-assignee'
                value={this.state.data.assigneeId} onChange={this.onFieldChange.bind(null, 'assigneeId')} >
              <option value=''>Not assigned</option>
              {this.props.users.users.map(o => <option value={o.userId} key={o.userId}>{o.name}</option>)}
            </select>
          </div>
          <hr className='hr_full'/>
          <p className='form__help'>The Date Range of Imagery Collected can be entered after the task is completed</p>
          <div className='form__group'>
            <label className='form__label'>Date Range of Imagery Collected</label>
            <div className='date-selector'>
              <div className='date-selector__picker'>
                <DateTimePicker
                  finalView='decade'
                  format={'YYYY-MM-DD'}
                  value={this.getValueForDate('timePeriodProvidedFrom')}
                  time={false}
                  onChange={this.onDateChange.bind(null, 'timePeriodProvidedFrom')} />
              </div>
              <p className='date-selector__sep'>to</p>
              <div className='date-selector__picker'>
                <DateTimePicker
                  min={this.dateOrUndefined('timePeriodProvidedFrom')}
                  finalView='decade'
                  format={'YYYY-MM-DD'}
                  value={this.getValueForDate('timePeriodProvidedTo')}
                  time={false}
                  onChange={this.onDateChange.bind(null, 'timePeriodProvidedTo')} />
              </div>
            </div>
          </div>
          <hr className='hr_full'/>
          <div className='form__actions'>
            <button type='submit' className={'button button--primary'} onClick={this.onSave}><span>{editing ? 'Save task' : 'Create task'}</span></button>
            {this.props.user.profile.roles.indexOf('coordinator') !== -1 ? (
              <button type='submit' className={'button button--secondary'} onClick={this.onSaveAndAdd}><span>{editing ? 'Save & add another' : 'Create & add another'}</span></button>
            ) : null}
            <Link to={`requests/${this.props.params.reqid}` + (editing ? `/tasks/${this.props.params.taskid}` : '')} className={'button button--base'}><span>Cancel</span></Link>
          </div>
        </form>
      </div>
    );
  },

  render: function () {
    let editing = !!this.props.params.taskid;
    let { fetched, fetching, error, data } = this.props.task;

    let pageTitle = 'Create Task';

    if (editing) {
      if (!fetched && !fetching) {
        return null;
      }

      if (fetching) {
        pageTitle = 'Edit Task';
      }

      if (data.name) {
        pageTitle = `Edit ${data.name}`;
      }
    }

    let reqName;
    let reqId;
    if (editing && data.requestId) {
      reqId = data.requestId;
      reqName = data.requestInfo.name;
    } else if (this.props.request.data._id) {
      reqId = this.props.request.data._id;
      reqName = this.props.request.data.name;
    }

    let showDelete = editing && this.props.user.profile.roles.indexOf('coordinator') !== -1;

    return (
      <section className='section section--page'>
        <header className='section__header'>
          <div className='inner'>
            <div className='section__headline'>
              <p className='section__subtitle'><Link to={`/requests/${reqId}`}>{reqName}</Link></p>
              <h1 className='section__title'>{pageTitle}</h1>
            </div>
            {showDelete ? (
            <div className='section__actions'>
              <a href='#' className='button-delete' onClick={this.onDeleteClick}><span>Delete task</span></a>
            </div>
            ) : null}
          </div>
        </header>
        <div className='section__body'>
          <div className='inner'>
            {editing && fetching ? <p className='loading-indicator'>Loading...</p> : null}
            {editing && error ? <p>Error</p> : null}
            {!editing || (editing && !fetching) ? this.renderFrom() : null}
            {this.props.taskForm.processing ? <p>Submitting data...</p> : null}
          </div>
        </div>
      </section>
    );
  }
});

// /////////////////////////////////////////////////////////////////// //
// Connect functions

function selector (state) {
  return {
    task: state.task,
    requestTasks: state.tasks,
    request: state.request,
    taskForm: state.taskForm,
    users: state.users,
    user: state.user,
    taskGeojson: state.map.taskGeojson
  };
}

function dispatcher (dispatch) {
  return {
    _fetchTask: (...args) => dispatch(fetchTask(...args)),
    _invalidateTask: (...args) => dispatch(invalidateTask(...args)),
    _postTask: (...args) => dispatch(postTask(...args)),
    _patchTask: (...args) => dispatch(patchTask(...args)),
    _resetTaskFrom: (...args) => dispatch(resetTaskFrom(...args)),
    _fetchRequest: (...args) => dispatch(fetchRequest(...args)),
    _fetchRequestTasks: (...args) => dispatch(fetchRequestTasks(...args)),
    _invalidateRequest: (...args) => dispatch(invalidateRequest(...args)),
    _deleteTask: (...args) => dispatch(deleteTask(...args)),
    _receiveUpload: (...args) => dispatch(receiveUpload(...args))
  };
}

module.exports = connect(selector, dispatcher)(TaskForm);
