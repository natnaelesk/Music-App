import styled from '@emotion/styled';

export const Form = styled.form`
 
background: rgba(255, 255, 255, 0.19);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.9px);
  -webkit-backdrop-filter: blur(4.9px);
  border: 1px solid rgba(255, 255, 255, 0.94);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  gap: 10px;

  @media (min-width: 750px) {
    padding: 10px 50px;
  }
    @media (min-width: 1200px) {
    margin: 0 auto;
    width:40vw;    
    height:85vh;
        } 
`;

export const InputItem = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;

  
`;

export const Label = styled.span`
  font-size: 14px;
  text-transform: uppercase;

  @media (min-width: 750px) {
    width: 50px;
    font-size: 18px;
  }
`;

export const InputText = styled.input`
  height: 35px;
  background: #fff;
  border: 0;
  border-radius: 5px 5px 0 0;
  border-bottom: 2px solid #90e0ef;
  width: 60%;
  max-width: 400px;
  padding: 5px 15px;

  @media (min-width: 750px) {
    font-size: 18px;
  }
`;

export const InputFile = styled.div`
  display: flex;
  gap: 20px;
`;

export const FileButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  border-bottom: 2px solid ${({ type }) => (type === 'image' ? '#' : '#00B3FF')};
  color: black;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.3s;
  text-transform: uppercase;
  margin-top: 20px;
  background: #fff;

  &:hover {
    background-color: ${({ type }) => (type === 'image' ? '#d9534f' : '#0056b3')};
  }

  @media (min-width: 750px) {
    padding: 15px 25px;
    font-size: 18px;
  }
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;

  @media (min-width: 750px) {
    width: 30px;
    height: 30px;
  }
`;

export const SubmitButton = styled.input`
  padding: 15px 45px;
  margin-top: 20px;
  margin-right: auto;
  border: 0px;
  border-radius: 10px;
  background: #00b3ff;
  font-size: 16px;
  color: white;
  font-weight: bold;
  cursor: pointer; 

  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0099e0; 
    transform: scale(1.05); 
  }

  @media (min-width: 750px) {
    margin: 40px auto;
  }
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

export const LoadingAnimation = styled.div`
width: 50px;
height: 50px;
border: 5px solid #f3f3f3;
border-top: 5px solid #3498db;
border-radius: 50%;
animation: spin 1s linear infinite;

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;