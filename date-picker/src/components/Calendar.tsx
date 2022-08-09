import styled from "@emotion/styled";
import { useState } from "react";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";

const DateBox = styled.h5`
  padding: 12px;
  margin-top: 60px;
  box-shadow: 1px 1px 4px 2px gray;
  cursor: pointer;
`;

const Container = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid #bbb;
  position: absolute;
  background-color: white;
  border-radius: 8px;
  top: 12%;
  overflow: hidden;
`;

const Header = styled.div`
  height: 12%;
  padding: 0 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
`;

const Weeks = styled.div`
  height: 16%;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
`;

const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  width: 100%;
  height: 80%;
`;

const Day = styled.div<{
  red: boolean;
  blue: boolean;
  today: boolean;
  selected: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background-color: ${(props) =>
    props.selected ? "#b266ff" : props.today ? "#66ffB2" : "white"};
  color: ${(props) => (props.red ? "red" : props.blue ? "blue" : "black")};
  cursor: pointer;
`;

const getDate = () => {
  const data = new Date();
  const date = data.getDate();
  const month = data.getMonth();
  const year = data.getFullYear();
  const numberOfDates = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  return {
    date,
    month,
    year,
    numberOfDates,
    firstDay,
  };
};

const getMonthData = (year: number, month: number) => {
  const numberOfDates = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  return {
    numberOfDates,
    firstDay,
  };
};
const formatDate = (num: number) => {
  if (num < 10) return `0${num}`;
  else return num;
};

const weekArr = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const weekStringArr = [
  "January",
  "February",
  "march",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Calendar() {
  const today = getDate();
  const [date, setDate] = useState(getDate());
  const [selected, setSelected] = useState({ month: 20, date: 1 });
  const [showCalendar, setShowCalendar] = useState(false);

  const onClickRight = () => {
    setDate((prev) => {
      if (prev.month === 11) {
        const data = getMonthData(prev.year + 1, 1);
        return { ...prev, year: prev.year + 1, month: 1, ...data };
      } else {
        const data = getMonthData(prev.year, prev.month + 1);
        return { ...prev, month: prev.month + 1, ...data };
      }
    });
  };

  const onClickLeft = () => {
    setDate((prev) => {
      if (prev.month === 0) {
        const data = getMonthData(prev.year - 1, 11);
        return { ...prev, year: prev.year - 1, month: 11, ...data };
      } else {
        const data = getMonthData(prev.year, prev.month - 1);
        return { ...prev, month: prev.month - 1, ...data };
      }
    });
  };
  return (
    <>
      <DateBox onClick={() => setShowCalendar((prev) => !prev)}>{`${
        today.year
      }/${formatDate(today.month + 1)}/${formatDate(today.date)}`}</DateBox>
      {showCalendar && (
        <Container>
          <Header>
            <VscChevronLeft
              onClick={onClickLeft}
              style={{ cursor: "pointer" }}
            />
            <span style={{ fontSize: "12px" }}>{`${date.year} ${
              weekStringArr[date.month]
            }`}</span>
            <VscChevronRight
              onClick={onClickRight}
              style={{ cursor: "pointer" }}
            />
          </Header>
          <Weeks>
            {weekArr.map((week) => (
              <span
                key={week}
                style={{
                  color:
                    week === "SUN" ? "red" : week === "SAT" ? "blue" : "black",
                  width: `${100 / 7}%`,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {week}
              </span>
            ))}
          </Weeks>
          <Days>
            <span style={{ gridColumnStart: date.firstDay }}></span>
            {Array(date.numberOfDates)
              .fill("")
              .map((_, idx) => (
                <Day
                  today={today.month === date.month && date.date === idx + 1}
                  selected={
                    date.month === selected.month && selected.date === idx + 1
                  }
                  onClick={() =>
                    setSelected({ month: date.month, date: idx + 1 })
                  }
                  red={idx % 7 === 7 - date.firstDay}
                  blue={idx % 7 === 6 - date.firstDay}
                  key={idx}
                >
                  {idx + 1}
                </Day>
              ))}
          </Days>
        </Container>
      )}
    </>
  );
}

export default Calendar;
