import React from "react";
import Modal from "./Modal";
import Form from "./Form";
import './index.sass';

export default class Homepage extends React.Component {
  state = {
    isFormModalVisible: false,
    isSuccessModalVisible: false
  };

  toggleFormVisible = (visible: boolean) => {
    this.setState({ isFormModalVisible: visible });
  }

  toggleSuccessNoticeVisible = (visible: boolean) => {
    this.setState({ isSuccessModalVisible: visible });
  }

  submitSuccess = () => {
    this.toggleFormVisible(false);
    this.toggleSuccessNoticeVisible(true);
  }

  render() {
    return (
      <div className="main-container">
        <div className="text-center">
          <h1>A better way to enjoy every day.</h1>
          <p>Be the first to know when we launch</p>
          <button
            className="invite-btn"
            onClick={() => this.toggleFormVisible(true)}
          >
            Request an invite
          </button>
          { this.state.isFormModalVisible ? (
            <Modal onClose={() => this.toggleFormVisible(false)}>
              <Form onSuccess={() => this.submitSuccess()} />
            </Modal>
          ) : null}

          { this.state.isSuccessModalVisible ? (
            <Modal onClose={() => this.toggleSuccessNoticeVisible(false)}>
              <div className="success-container">
                <div className="title">All done!</div>
                <button 
                  className="btn"
                  onClick={() => this.toggleSuccessNoticeVisible(false)}
                >
                  Ok
                </button>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}
