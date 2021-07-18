import styled from 'styled-components';

const Box = styled.div`
  background: #FFFFFF;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 10px;

  ol {
    margin-top: 14px;
    list-style: none;
  }

  .boxLink {
    font-size: 14px;
    color: #2E7BB4;
    text-decoration: none;
    font-weight: 800;
  }

  .title {
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 20px;
  }

  .subTitle {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
  }

  .Titulinho {
    font-size: 16px;
    font-weight: 600;
    margin-top: 25px;
    margin-left: 15px;
  }

  .smallTitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #333333;
    margin-bottom: 20px;
  }

  .titleDep {
    color: #2E7BB4;
    margin: 7.5px 5px ;
  }

  .textDep {
    margin: 10px 5px 10px 5px;  
    text-align: justify;
    color: #3c4e5c;
  }

  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ECF2FA;
  }

  pre {
    font-family: sans-serif;
    font-size: 14px;
    margin: 15px 0px;
  }

  input {
    width: 100%;
    background-color: #F4F4F4;
    color: #333333;
    border: 0;
    padding: 14px 16px;
    margin-top: 14px;
    border-radius: 10000px;
    ::placeholder {
      color: #6e6e6e;
      opacity: 1;
    }
  }

  textarea {
    font-family: sans-serif;
    width: 100%;
    background-color: #F4F4F4;
    color: #333333;
    border: 5px solid #F4F4F4;
    padding: 14px 16px;
    margin-top: 14px;
    border-radius: 15px;
    ::placeholder {
      color: #6e6e6e;
      opacity: 1;
    }
  }

  button {
    border: 0;
    padding: 8px 12px;
    margin-top:14px;
    color: #FFFFFF;
    border-radius: 10000px;
    background-color: #a85700;
  }

  .caixinha{
    padding: 0 5px;
    border: 1px solid #ededed;
    border-radius: 15px;
    margin-top: 10px;
  }
`; 

export default Box;