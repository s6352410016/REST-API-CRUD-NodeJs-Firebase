import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './css/style.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateTravel = () => {
  const [dmyToGo, setDmyToGo] = useState('');
  const [dmyToBack, setDmyToBack] = useState('');
  const [placeToGo, setPlaceToGo] = useState('');
  const [expenses, setExpenses] = useState(0);

  const { id } = useParams();

  const updateTravel = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/updateTravel/${id}`, {
      dmyToGo: dmyToGo,
      dmyToBack: dmyToBack,
      placeToGo: placeToGo,
      expenses: expenses
    }).then((res) => {
      if (res.status === 200) {
        Swal.fire(
          'Updated Travel Successfully!',
          'You clicked the button!',
          'success'
        ).then(() => {
          window.location.href = '/showhistorytravel';
        });
      }
    });
  }

  useEffect(() => {
    axios.get(`http://localhost:5000/getTravelDataById/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setDmyToGo(res.data.dmyToGo);
          setDmyToBack(res.data.dmyToBack);
          setPlaceToGo(res.data.placeToGo);
          setExpenses(res.data.expenses);
        }
      });
  }, []);

  return (
    <Container className='myContainer'>
      <h1 className='text-center'>My Travel</h1>
      <h1 className='text-center'>แก้ไขข้อมูลการเดินทาง</h1>
      <Form onSubmit={(e) => updateTravel(e)} className='mt-5'>
        <Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>วัน/เดือน/ปี ที่ไป</Form.Label>
            <Form.Control type="text" value={dmyToGo} required onChange={(e) => setDmyToGo(e.target.value)}/>
          </Form.Group>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>วัน/เดือน/ปี ที่กลับ</Form.Label>
            <Form.Control type="text" value={dmyToBack} required onChange={(e) => setDmyToBack(e.target.value)}/>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>สถานที่ที่ไป</Form.Label>
          <Form.Control type="text" value={placeToGo} required onChange={(e) => setPlaceToGo(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ค่าใช้จ่ายตลอดการเดินทาง</Form.Label>
          <Form.Control type="number" value={expenses} required onChange={(e) => setExpenses(e.target.value)}/>
        </Form.Group>
        <Button className='mt-3' variant="primary" type="submit">
          บันทึกแก้ไขการเดินทาง
        </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button href='/showhistorytravel' className='mt-3' variant="success">
          ประวัติการเดินทาง
        </Button>
      </Form>
    </Container>
  );
}

export default UpdateTravel;