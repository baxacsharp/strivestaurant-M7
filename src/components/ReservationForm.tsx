import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'

type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

const ReservationForm = () => {
    const [reservation, setReservation] = useState({
        name: '',
        phone: '',
        numberOfPersons: 1,
        smoking: false,
        dateTime: '',
        specialRequests: ''
    })

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {

        let id = e.target.id

        setReservation({
            ...reservation,
            [id]: id === 'smoking' ? e.target.checked : e.target.value
        })
    }

    useEffect(() => {
    }, [reservation])

    const submitReservation = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            let response = await fetch("https://striveschool.herokuapp.com/api/reservation", {
                method: 'POST',
                body: JSON.stringify(reservation),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            if (response.ok) {
                alert('Reservation saved!')
                setReservation({
                    name: '',
                    phone: '',
                    numberOfPersons: 1,
                    smoking: false,
                    dateTime: '',
                    specialRequests: ''
                })
            } else {
                alert('Houston we had a problem, try again!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h3 className="mt-3">RESERVATION FORM</h3>
            <Form className="mb-5" onSubmit={(e) => submitReservation(e)}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={reservation.name}
                        id="name"
                        onChange={inputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter phone"
                        id="phone"
                        value={reservation.phone}
                        onChange={inputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>How many people?</Form.Label>
                    <Form.Control
                        as="select"
                        value={reservation.numberOfPersons}
                        id="numberOfPersons"
                        onChange={inputChange}
                    >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Check
                        type="checkbox"
                        label="Do you smoke?"
                        checked={reservation.smoking}
                        id="smoking"
                        onChange={inputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        value={reservation.dateTime}
                        id="dateTime"
                        onChange={inputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Any special request?</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={reservation.specialRequests}
                        id="specialRequests"
                        onChange={inputChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default ReservationForm