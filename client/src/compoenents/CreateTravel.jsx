import React, { useState } from 'react';
import './css/style.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import Swal from 'sweetalert2';

const CreateTravel = () => {
  const [dmyToGo, setDmyToGo] = useState('');
  const [dmyToBack, setDmyToBack] = useState('');
  const [placeToGo, setPlaceToGo] = useState('');
  const [expenses, setExpenses] = useState(0);

  const createTravel = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/createTravel', {
      dmyToGo: dmyToGo,
      dmyToBack: dmyToBack,
      placeToGo: placeToGo,
      expenses: expenses
    }).then((res) => {
      if (res.status === 201) {
        Swal.fire(
          'Created Travel Sucessfully!',
          'You clicked the button!',
          'success'
        ).then(() => {
          window.location.href = '/showhistorytravel';
        });
      }
    });
  }

  return (
    <Container className='myContainer'>
      <h1 className='text-center'>My Travel</h1>
      <h1 className='text-center mb-5'>บันทึกข้อมูลการเดินทาง</h1>
      <Form onSubmit={(e) => createTravel(e)}>
        <Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>วัน/เดือน/ปี ที่ไป</Form.Label>
            <Form.Control type="text" onChange={(e) => setDmyToGo(e.target.value)} required />
          </Form.Group>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>วัน/เดือน/ปี ที่กลับ</Form.Label>
            <Form.Control type="text" onChange={(e) => setDmyToBack(e.target.value)} required />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>สถานที่ที่ไป</Form.Label>
          <Form.Control type="text" onChange={(e) => setPlaceToGo(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ค่าใช้จ่ายตลอดการเดินทาง</Form.Label>
          <Form.Control type="number" onChange={(e) => setExpenses(e.target.value)} required />
        </Form.Group>
        <Button className='mt-3' variant="primary" type="submit">
          บันทึกข้อมูลการเดินทาง
        </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button href='/showhistorytravel' className='mt-3' variant="success">
          ประวัติการเดินทาง
        </Button>
      </Form>
    </Container>
  );
}

export default CreateTravel;