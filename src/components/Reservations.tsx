import { useEffect, useState } from 'react'
import { Container, Col, Row, ListGroup } from 'react-bootstrap'
import Loading from './Loading'
import Error from './Error'
import ReservationForm from './ReservationForm'
import { reservations } from '../helpers/types'
const Reservations = () => {

    const [reservations, setReservations] = useState<reservations[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                let response = await fetch('https://striveschool.herokuapp.com/api/reservation')
                let newReservations = await response.json()
                setReservations(newReservations)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                setIsLoading(false)
                setIsError(true)
            }
        }
        getData()
    }, [])
    return (
        <Container>
            <Row className="justify-content-center mt-3">
                <Col xs={12} md={6}>
                    <h3>RESERVATIONS:</h3>
                    {isLoading && <Loading />}
                    {isError && <Error />}
                    {
                        (
                            reservations.length === 0
                            && isLoading === false
                            && isError === false
                        )
                            ? <p>NO RESERVATIONS</p>
                            : <ListGroup>
                                {reservations.map(reservation =>
                                    <ListGroup.Item key={reservation._id}>
                                        {reservation.name}
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                    }
                </Col>
            </Row>
            <Row className="justify-content-center mt-3">
                <Col xs={12} md={6}>
                    <ReservationForm />
                </Col>
            </Row>
        </Container>
    )
}

export default Reservations