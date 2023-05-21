import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f3e3f4;
`;

const MainTitle = styled.h1`
  font-size: 40px;
  color: #5c057e;
  margin-bottom: 20px;
`;

const ContactsTitle = styled.h2`
  font-size: 36px;
  color: #5c057e;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 18px;
  color: #5c057e;
`;

export { Container, MainTitle, ContactsTitle, Message };
