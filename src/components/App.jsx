import React, { Component } from "react";
import { nanoid } from "nanoid";
import { Container, MainTitle, ContactsTitle, Message } from "./App.styled";
import { FormContact } from "./FormContact/FormContact";
import { Contacts } from "./Contacts/Contacts";
import { FormFilter } from "./Filter/Filter";
import initialContacts from "./contacts.json"


const CONTACTS_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: initialContacts,
    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem(CONTACTS_KEY);
    const parsedContacts = JSON.parse(contacts);

    if(parsedContacts) {
      this.setState({contacts: parsedContacts})
    }
    

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(this.state.contacts))
    }
  }

  addContact = (name, number) => {
    const normalizedNumber = this.normalizedNumber(number);
    const checkName = this.state.contacts.some(
      (el) => el.name.toLowerCase() === name.toLowerCase()
    );
    if (checkName) {
      return alert(`${name} is already in contacts.`);
    }

    const contact = {
      id: nanoid(),
      name: name,
      number: normalizedNumber,
    };

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  normalizedNumber = number => {
    let normalizedNumber = number.substring(0, 3) + '-';
    for (let i = 3; i < number.length; i += 1) {
      if ((i - 3) % 2 === 0 && i !== 3) {
        normalizedNumber += '-';
      }
      normalizedNumber += number[i];
    }
    return normalizedNumber;
  };

  onChangeFilter = (evt) => {
    this.setState({ filter: evt.currentTarget.value });
  };

  getContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  removeContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((el) => el.id !== id),
    }));
  };



  render() {
    const { contacts } = this.state;
    const filteredContacts = this.getContacts();
    return (
      <Container>
        <MainTitle>Phonebook</MainTitle>
        <FormContact addContact={this.addContact} />

        <ContactsTitle>Contacts</ContactsTitle>
        <FormFilter
          label="Find contacts by name"
          onChange={this.onChangeFilter}
        />
        {contacts.length === 0 ? (
          <Message>You don't have contacts yet</Message>
        ) : (
          <Contacts
            options={filteredContacts}
            removeContact={this.removeContact}
          />
        )}
      </Container>
    );
  }
}
