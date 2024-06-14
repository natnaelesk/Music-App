import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import star from '../../images/star.png'; 

const sparkleAnimation = keyframes`
  0%, 100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const NavbarContainer = styled.nav`
  width:100vw;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 15px 0 15px;
  box-sizing: border-box;

  @media (min-width: 750px) {
    width:95vw;
    padding: 20px 45px 0 45px;
  }
  @media (min-width: 1200px) {
    width:unset;
    margin-top: 30px;
  }
`;

export const Button = styled.button`
  width: 140px;
  height: 40px;
  background-color: #0D8BFF;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  border-radius: 10px;
  padding: 0; /* Ensure no extra padding */
  box-sizing: border-box;
  color: white;
  font-size: 12px;
  font-weight: bold;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.3s ease-in-out;
  overflow: shadow;

  @media (min-width: 750px) {
    width: 200px;
    height: 55px;
    border-radius: 15px;
    font-size: 17px;
  }

  &:hover {
    box-shadow: 0 0 5px #0D8BFF, 0 0 10px #0D8BFF, 0 0 20px #0D8BFF;

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 30px; /* Adjust the size of the star */
      height: 30px; /* Adjust the size of the star */
      background-image: url(${star});
      background-size: cover;
      background-repeat: no-repeat;
      opacity: 0;
      animation: ${sparkleAnimation} 0.8s infinite;
    }

    &::before {
      top: 10%;
      left: 10%;
    }

    &::after {
      top: 80%;
      left: 80%;
    }
  }
`;

export const HomeIcon = styled.p`
  padding: 10px 20px ;
  border: 2ps solid transparent;
  margin-left: 10px;
  font-size: 18px;
  color: #0D8BFF;
  position: relative;
  cursor: pointer;
  transition: font-size 0.3s ease, font-weight 0.3s ease, border-radius 0.3s ease;

  &:hover {
    font-size: 20px; 
    font-weight: 900; 
    border-bottom: 1px solid #0D8BFF; 
    
  }

  @media (min-width: 750px) {
    font-size: 25px; 
    &:hover {
    font-size: 24px;
    font-weight: 900; 
    border-bottom: 2px solid #0D8BFF; 
    
  }
  }
     @media (min-width: 1200px) {
      padding: 10px 40px ;
    margin-left: 20px;
    &:hover {
    font-size: 24px; 
    font-weight: 900; 
    border-bottom: 2px solid #0D8BFF; /* Add a bottom border on hover */
    
  }
  }

`;

export const SparkleIcon = styled.img`
  width: 30px;
  height: 30px;
  border: 0;

  @media (min-width: 750px) {
    width: 50px;
    height: 50px;
  }
`;
