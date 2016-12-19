'use strict';
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import c from 'classnames';
import _ from 'lodash';
import { hashHistory, Link } from 'react-router';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import momentLocalizer from 'react-widgets/lib/localizers/moment';

momentLocalizer(moment);

import { fetchRequest, invalidateRequest, postRequest, patchRequest, resetRequestFrom, deleteRequest } from '../actions';

var RequestForm = React.createClass({
  displayName: 'RequestForm',

  propTypes: {
    _fetchRequest: T.func,
    _invalidateRequest: T.func,
    _postRequest: T.func,
    _patchRequest: T.func,
    _resetRequestFrom: T.func,
    _deleteRequest: T.func,

    params: T.object,
    request: T.object,
    requestForm: T.object
  },

  goToTaskForm: false,

  getInitialState: function () {
    return {
      data: {
        name: '',
        status: 'open',
        requestingOrg: '',
        gsd: '',
        productType: '',
        purpose: '',
        use: '',
        notes: '',
        timePeriodRequestedFrom: null,
        timePeriodRequestedTo: null
      },
      errors: {}
    };
  },

  checkErrors: function () {
    let control = true;
    let errors = {};

    if (this.state.data.name === '') {
      errors.name = true;
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
        status: this.state.data.status || null,
        timePeriodRequestedFrom: this.state.data.timePeriodRequestedFrom
          ? moment(this.state.data.timePeriodRequestedFrom).format('YYYY-MM-DD')
          : null,
        timePeriodRequestedTo: this.state.data.timePeriodRequestedTo
          ? moment(this.state.data.timePeriodRequestedTo).format('YYYY-MM-DD')
          : null,
        requestingOrg: this.state.data.requestingOrg || null,
        gsd: this.state.data.gsd || null,
        productType: this.state.data.productType || null,
        purpose: this.state.data.purpose || null,
        use: this.state.data.use || null,
        notes: this.state.data.notes || null
      };

      if (this.props.params.reqid) {
        this.props._patchRequest(this.props.params.reqid, payload);
      } else {
        // On create we only want to send properties that were filled in.
        payload = _.pickBy(payload, v => v !== null);
        this.props._postRequest(payload);
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

  onDeleteClick: function (e) {
    e.preventDefault();

    let msg = `Are you sure you want to delete ${this.props.request.data.name}?
This action is permanent, and all associated tasks will be deleted as well.`;

    if (confirm(msg)) {
      this.props._deleteRequest(this.props.params.reqid);
      hashHistory.push(`/`);
    }
  },

  componentDidMount: function () {
    if (this.props.params.reqid) {
      this.props._fetchRequest(this.props.params.reqid);
    }
  },

  componentWillUnmount: function () {
    this.props._invalidateRequest();
    this.props._resetRequestFrom();
  },

  componentWillReceiveProps: function (nextProps) {
    // When editing a request we need to put the data in the state as soon as
    // it is loaded. only in this way can we access it in the fields.
    let { fetched: prevfetched, fetching: prevfetching } = this.props.request;
    let { fetched, fetching, error, data } = nextProps.request;

    // If it was fetching and now it's not.
    if (!prevfetched && prevfetching && fetched && !fetching && !error) {
      let loadedData = {};
      Object.keys(this.state.data).forEach(k => {
        loadedData[k] = data[k] === null ? '' : data[k];
      });
      // These two are different
      loadedData.timePeriodRequestedFrom = data.timePeriodRequested.from;
      loadedData.timePeriodRequestedTo = data.timePeriodRequested.to;
      this.setState({data: loadedData});
    }

    let prevProcessing = this.props.requestForm.processing;
    let {processing, data: newRequest} = nextProps.requestForm;
    // Result came back.
    if (prevProcessing && !processing && newRequest._id) {
      if (this.goToTaskForm) {
        hashHistory.push(`/requests/${newRequest._id}/tasks/edit`);
      } else {
        hashHistory.push(`/requests/${newRequest._id}`);
      }
    }
  },

  renderFrom: function (data = {}) {
    let editing = !!this.props.params.reqid;
    return (
      <div className='request-form'>
        <form ref='form' className='form'>
          <div className='form__group'>
            <label className='form__label' htmlFor='request-name'>Request name <small>(required)</small></label>
            <input type='text' className='form__control form__control--medium' id='request-name' name='request-name' placeholder='Request name'
                value={this.state.data.name} onChange={this.onFieldChange.bind(null, 'name')} />
            {this.state.errors.name
              ? <p className='message message--alert'>A name is required</p>
              : null
            }
          </div>
          <div className='form__group'>
            <label className='form__label' htmlFor='request-status'>Status</label>
            <select className={c('form__control form__control--medium', {'disabled': !editing})} id='request-status'
                value={this.state.data.status} onChange={this.onFieldChange.bind(null, 'status')} >
              <option value='open'>Open</option>
              <option value='closed'>Closed</option>
              <option value='canceled'>Canceled</option>
            </select>
          </div>
          <div className='form__group'>
            <label className='form__label'>Time period requested</label>

            <div className='date-selector'>
              <div className='date-selector__picker'>
                <DateTimePicker
                  max={this.dateOrUndefined('timePeriodRequestedTo') || new Date()}
                  finalView='decade'
                  format={'YYYY-MM-DD'}
                  value={this.getValueForDate('timePeriodRequestedFrom')}
                  time={false}
                  onChange={this.onDateChange.bind(null, 'timePeriodRequestedFrom')} />
              </div>
              <p className='date-selector__sep'>to</p>
              <div className='date-selector__picker'>
                <DateTimePicker
                  min={this.dateOrUndefined('timePeriodRequestedFrom')}
                  max={new Date()}
                  finalView='decade'
                  format={'YYYY-MM-DD'}
                  value={this.getValueForDate('timePeriodRequestedTo')}
                  time={false}
                  onChange={this.onDateChange.bind(null, 'timePeriodRequestedTo')} />
              </div>
            </div>
            <p className='form__help'>The dates are used to express a range and are optional.</p>

          </div>
          <div className='form__group'>
            <label className='form__label' htmlFor='request-org'>Requesting organization</label>
            <input type='text' className='form__control form__control--medium' id='request-org' name='request-org' placeholder='Requesting organization'
                value={this.state.data.requestingOrg} onChange={this.onFieldChange.bind(null, 'requestingOrg')} />
          </div>
          <div className='form__group'>
            <label className='form__label' htmlFor='request-gsd'>GSD</label>
            <input ref='gsd' type='text' className='form__control form__control--medium' id='request-gsd' name='request-gsd' placeholder='Desired GSD'
                value={this.state.data.gsd} onChange={this.onFieldChange.bind(null, 'gsd')} />
          </div>
          <div className='form__group'>
            <label className='form__label' htmlFor='request-prod-type'>Product type</label>
            <input ref='productType' type='text' className='form__control form__control--medium' id='request-prod-type' name='request-prod-type' placeholder='Product type'
                value={this.state.data.productType} onChange={this.onFieldChange.bind(null, 'productType')} />
          </div>
          <div className='form__group'>
            <label className='form__label' htmlFor='request-purpose'>Purpose</label>
            <textarea ref='purpose' className='form__control' id='request-purpose' rows='4' placeholder='Purpose of this request'
                value={this.state.data.purpose} onChange={this.onFieldChange.bind(null, 'purpose')} ></textarea>
          </div>
          <div className='form__group'>
            <label className='form__label' htmlFor='request-use'>Use</label>
            <textarea ref='use' className='form__control' id='request-use' rows='4' placeholder='Intended use for the imagery'
                value={this.state.data.use} onChange={this.onFieldChange.bind(null, 'use')} ></textarea>
          </div>
          <div className='form__group'>
            <label className='form__label' htmlFor='request-notes'>Notes</label>
            <textarea ref='notes' className='form__control' id='request-notes' rows='4' placeholder='Additional notes'
                value={this.state.data.notes} onChange={this.onFieldChange.bind(null, 'notes')} ></textarea>
          </div>
          <div className='form__actions'>
            <button type='submit' className={'button button--primary'} onClick={this.onSave}><span>{editing ? 'Save request' : 'Create request'}</span></button>
            <button type='submit' className={'button button--primary'} onClick={this.onSaveAndAdd}><span>{editing ? 'Save & add task' : 'Create & add task'}</span></button>
            <Link to={editing ? `requests/${this.props.params.reqid}` : '/'} className={'button button--base'}><span>Cancel</span></Link>
          </div>
        </form>
      </div>
    );
  },

  render: function () {
    let editing = !!this.props.params.reqid;
    let { fetched, fetching, error, data } = this.props.request;

    let pageTitle = 'Create Request';

    if (editing) {
      if (!fetched && !fetching) {
        return null;
      }

      if (fetching) {
        pageTitle = 'Edit Request';
      }

      if (data.name) {
        pageTitle = `Edit ${data.name}`;
      }
    }

    return (
      <section className='section section--page'>
        <header className='section__header'>
          <div className='inner'>
            <div className='section__headline'>
              <h1 className='section__title'>{pageTitle}</h1>
            </div>
            {editing ? (
            <div className='section__actions'>
              <a href='#' className='button--delete' onClick={this.onDeleteClick}><span>Delete</span></a>
            </div>
            ) : null}
          </div>
        </header>
        <div className='section__body'>
          <div className='inner'>
            {this.props.requestForm.processing ? <p>Submitting data...</p> : null}
            {editing && fetching ? <p className='loading-indicator'>Loading...</p> : null}
            {editing && error ? <p>Error</p> : null}
            {!editing || (editing && !fetching) ? this.renderFrom() : null}
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
    request: state.request,
    requestForm: state.requestForm
  };
}

function dispatcher (dispatch) {
  return {
    _fetchRequest: (...args) => dispatch(fetchRequest(...args)),
    _invalidateRequest: (...args) => dispatch(invalidateRequest(...args)),
    _postRequest: (...args) => dispatch(postRequest(...args)),
    _patchRequest: (...args) => dispatch(patchRequest(...args)),
    _resetRequestFrom: (...args) => dispatch(resetRequestFrom(...args)),
    _deleteRequest: (...args) => dispatch(deleteRequest(...args))
  };
}

module.exports = connect(selector, dispatcher)(RequestForm);
