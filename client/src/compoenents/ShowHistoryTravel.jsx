import React, { useState, useEffect } from 'react';
import './css/style.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Swal from 'sweetalert2'

const ShowHistoryTravel = () => {
  const [travelData, setTravelData] = useState([]);

  const deleteTravel = (id) => {
    Swal.fire({
      title: 'Are You Sure To Delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Deleted Travel Successfully.',
          'success'
        ).then(() => {
          axios.delete(`http://localhost:5000/deleteTravel/${id}`)
            .then((res) => {
              if (res.status === 200) {
                window.location.href = '/showhistorytravel';
              }
            });
        });
      }
    })
  }

  useEffect(() => {
    axios.get('http://localhost:5000/getAllTravelData')
      .then((res) => {
        if (res.status === 200) {
          setTravelData(res.data);
        }
      });
  }, []);

  return (
    <Container className='myContainer'>
      <h1 className='text-center'>My Travel</h1>
      <h1 className='text-center'>ประวัติการเดินทาง</h1>
      <Button href='/' className='mt-3' variant="primary" type="submit">
        บันทึกข้อมูลการเดินทาง
      </Button>
      <Table striped bordered hover className='mt-3'>
        <thead>
          <tr>
            <th>วัน/เดือน/ปี ที่ไป</th>
            <th>วัน/เดือน/ปี ที่กลับ</th>
            <th>สถานที่ที่ไป</th>
            <th>ค่าใช้จ่ายตลอดการเดินทาง</th>
            <th>แก้ไข</th>
            <th>ลบ</th>
          </tr>
        </thead>
        <tbody>
          {travelData.length === 0
            ?
            <tr>
              <td colSpan={6} className='text-center'>No Travel Data.</td>
            </tr>
            :
            travelData.map((e, index) => (
              <tr key={index}>
                <td>{e.dmyToGo}</td>
                <td>{e.dmyToBack}</td>
                <td>{e.placeToGo}</td>
                <td>{e.expenses}</td>
                <td>
                  <Button href={`/updatetravel/${e.id}`} variant='success'>แก้ไข</Button>
                </td>
                <td>
                  <Button onClick={() => deleteTravel(e.id)} variant='danger'>ลบ</Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </Container>
  );
}

export default ShowHistoryTravel;