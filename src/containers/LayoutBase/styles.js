import styled from 'styled-components'
import { Layout } from 'antd'

export const StyledLayoutWrapper = styled(Layout)`
  min-height: 100vh;
  position: relative;
  .sider-wrapper, .ant-menu-dark {
    background-color: #2F3136;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    .ant-menu-item-selected {
      background-color: #2F3136 !important;
      border-left: 3px solid var(--primary);
    }
    .logo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding-bottom: 50px;
      h1 {
        color: var(--primary);
        font-size: 42px;
        font-weight: bold;
        margin: 0;
        transition: easy-in-out .2s;
      }
      h3 {
        color: #fff;
        font-size: 18px;
        font-weight: 700;
      }
    }
    .sider-bottom {
      position: absolute;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      .ant-btn {
        color: #fff;
      }
    }
  }
  #components-layout-demo-custom-trigger .trigger {
    padding: 0 24px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
  }
  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }
  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }
  .ant-layout-header {
    background-color: #ffffff !important;
  }
  .ant-layout-content {
    padding: 0 !important;
  }
  .site-layout .site-layout-background {
    background: var(--gray);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .header-trigger-wrapper {
      padding: 0 50px;
      display: flex;
      flex-direction: row;
      align-items: center;
      .anticon {
        cursor: pointer;
        font-size: 22px;
      }
      h3 {
        margin: 0 15px;
      }
    }
    
    .top-actions {
      display: flex;
      flex-direction: row;
      margin-right: 50px;
      
      .anticon {
        font-size: 20px;
        color: #8E9297;
      }
      .profile-action {
        margin-left: 15px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .ant-avatar {
          background-color: var(--primary);
          .anticon {
            color: #fff;
          }
        }
        span {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
        .ant-icon {
          margin-left: 5px;
        }
      }
    }
  }
`