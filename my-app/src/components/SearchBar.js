import React from "react";
import { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Search } from "react-feather";
const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  }

  return (
    <Form
        className="mt-3 justify-content-start search-form"
        onSubmit={handleSubmit}>
        <Row>
        <Col sm={8}>
        <Form.Control type="symbol"
        value={searchInput}
        autoFocus
        onChange={handleChange}
        className="bg-dark text-white"
        placeholder="Enter stock symbol"/>
        </Col>
        <Col>
        <Button className="search-button" type='submit'>
        <Search />
        </Button>  
        </Col>
        </Row>  
    </Form>
  );
}

export default SearchBar;