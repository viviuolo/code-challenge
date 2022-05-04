import React from "react";
import axios from "axios";
import './form.sass';

interface IProps {
  [prop: string]: any
}

interface IField {
  username: string,
  email: string,
  confirmEmail: string,
  [key: string]: any
}

interface IState {
  fields: IField,
  fieldErrors: {
    [key: string]: any
  },
  backendError: string,
  loading: boolean
}

type FieldKeys = 'username' | 'email' | 'confirmEmail';

const LOGIN_URL = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth';

export default class Form extends React.Component<IProps, IState>  {
  state = {
    fields: {
      username: "",
      email: "",
      confirmEmail: "",
    },
    fieldErrors: {},
    backendError: '',
    loading: false
  };

  onFormSubmit = async (e: HTMLFormElement | any) => {
    e.preventDefault();
  
    const fieldErrors = this.validate(this.state.fields);

    // has errors
    if (Object.keys(fieldErrors).length) {
      return;
    }

    this.setState({loading: true});
    axios.post(LOGIN_URL, {
      name: this.state.fields.username,
      email: this.state.fields.email,
    })
      .then(() => {
        this.props.onSuccess();
      })
      .catch((error) => {
        console.log(111111, error)
        if (error && error.response && error.response.data) {
          this.setState({ backendError: error.response.data.errorMessage || 'api error' });
        }
      })
      .finally(() => {
        this.setState({loading: false});
      })
  };

  validate = (fields: IField, key = '') => {
    const error: any = {};
    const username = fields.username.trim();
    const email = fields.email.trim();
    const confirmEmail = fields.confirmEmail;
    const pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (username.length < 3) {
      error.username = "Name should contain at least 3 characters";
    }
  
    if (!email) {
      error.email = "Email is required";
    } else if (!pattern.test(email)) {
      error.email = "Invalid email format";
    }

    if (!confirmEmail) {
      error.confirmEmail = "Confirm Email is required";
    }

    if (email !== confirmEmail) {
      error.confirmEmail = "Confirmed Email does not match the email";
    }

    this.setState({ fieldErrors: error });
    return error;
  };

  onChangeHandler = (e: any) => {
    const fields = { ...this.state.fields };
    fields[e.target.name as FieldKeys] = e.target.value;
    this.setState({ fields });
  };

  render() {
    return (
      <form className="form-container" onSubmit={this.onFormSubmit}>
        <div className="form-title">
          Request an invite
        </div>
        <div className="field">
          <input
            type="text"
            name="username"
            placeholder="Full name"
            className={(this.state.fieldErrors as any).username ? 'input-error' : 'input'}
            onChange={this.onChangeHandler}
          />
          {
            (this.state.fieldErrors as any).username
            ?
            <span className="red">
              {(this.state.fieldErrors as any).username}
            </span>
            :
            null
          }
        </div>
        <div className="field">
          <input
            type="text"
            name="email"
            placeholder="Email"
            className={(this.state.fieldErrors as any).email ? 'input-error' : 'input'}
            onChange={this.onChangeHandler}
          />
          {
            (this.state.fieldErrors as any).email
            ?
            <span className="red">
              {(this.state.fieldErrors as any).email}
            </span>
            :
            null
          }
        </div>
        <div className="field">
          <input
            type="text"
            name="confirmEmail"
            placeholder="Confirm Email"
            className={(this.state.fieldErrors as any).confirmEmail ? 'input-error' : 'input'}
            onChange={this.onChangeHandler}
          />
          {
            (this.state.fieldErrors as any).confirmEmail
            ?
            <span className="red">
              {(this.state.fieldErrors as any).confirmEmail}
            </span>
            :
            null
          }
        </div>
        <button className="btn" type="submit" disabled={this.state.loading}>
          {this.state.loading ? 'Sending, please wait' : 'Send'}
        </button>
        {
            this.state.backendError
            ?
            <div className="server-error">{this.state.backendError}</div>
            :
            null
          }
      </form>
    );
  }
}
