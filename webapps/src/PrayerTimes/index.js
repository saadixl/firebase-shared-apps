import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

async function getPrayerTimes(setPrayerTimes) {
  const res = await axios.get(
    "https://api.aladhan.com/v1/timingsByCity?city=Singapore&country=Singapore",
  );
  const timings = res?.data?.data?.timings;
  let result = [];
  if (timings) {
    const fajr = formatTime("Fajr", timings.Fajr);
    const sunrise = formatTime("Sunrise", timings.Sunrise);
    const dhuhr = formatTime("Dhuhr", timings.Dhuhr);
    const asr = formatTime("Asr", timings.Asr);
    const maghrib = formatTime("Maghrib", timings.Maghrib);
    const isha = formatTime("Isha", timings.Isha);
    result = [fajr, sunrise, dhuhr, asr, maghrib, isha];
  }
  setPrayerTimes(result);
}

function formatTime(title, time) {
  return {
    title,
    time: moment(time, "h:mm a").format("h:mm a"),
  };
}

export default function PrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState([]);
  useEffect(() => {
    getPrayerTimes(setPrayerTimes);
  }, []);

  const prayerTimesListItem = prayerTimes.map((item, key) => {
    const { title, time } = item;
    return (
      <ListGroup.Item key={key}>
        <Row>
          <Col xs={6}>{title}</Col>
          <Col className="list-item-time" xs={6}>
            {time}
          </Col>
        </Row>
      </ListGroup.Item>
    );
  });

  return (
    <Container className="prayer-times-container">
      <Row>
        <Col xs={12}>
          <h2 className="text-center heading">Singapore Prayer Times</h2>
        </Col>
        <Col xs={12}>
          <ListGroup>{prayerTimesListItem}</ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
