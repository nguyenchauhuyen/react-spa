import { Panel } from 'primereact/panel';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRegister } from './hooks';

const UserForm = ({ match }) => {
  const { loaders, actions, data: userInfo } = useRegister();

  useEffect(() => {
    actions.getUserInfo({ username: match.params.id });
  }, []);

  console.log(userInfo);

  return (
    <div className="p-grid p-fluid dashboard">
      <div className="p-col-12 p-fluid">
        <Panel header="Your Profile">
          <div className="p-grid">
            <div className="p-col-4">
              <FormWrapper className="flex justify-content-center">
                <div className="card">{userInfo.name}</div>
                <img src={userInfo.avatar_url} className="avatar" />
              </FormWrapper>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
};

const FormWrapper = styled.div`
  .card {
    min-width: 450px;
  }
  .card form {
    margin-top: 2rem;
  }
  .card .field {
    margin-bottom: 1.5rem;
  }
  .mt-2 {
    margin-top: 8px;
  }
  .avatar {
    width: 150px;
    border-radius: 50%;
  }
  @media screen and (max-width: 960px) {
    .card {
      width: 80%;
    }
  }
  @media screen and (max-width: 640px) {
    .card {
      width: 100%;
      min-width: 0;
    }
  }
`;

export default UserForm;
