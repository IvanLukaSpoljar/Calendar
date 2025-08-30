import { useEffect } from 'react';
import './App.scss';

function App() {

  /*************************************FUNCTIONS******************************************/
  function calendarInitialize() {

    //new Date(2023, 2, 5)
    let currentDate = new Date();
    let daysInWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    //Display current date in calendar
    const yearElement = document.getElementById("my_calendar_footer_year_wrapper")?.getElementsByTagName('p')[0];
    const monthElement = document.getElementById("my_calendar_footer_month_wrapper")?.getElementsByTagName('p')[0];
    const dayElement = document.getElementById("my_calendar_footer_day_wrapper")?.getElementsByTagName('p')[0];

    if (yearElement) yearElement.innerText = currentDate.getFullYear().toString();
    if (monthElement) monthElement.innerText = (currentDate.getMonth() + 1).toString();
    if (dayElement) dayElement.innerText = currentDate.getDate().toString();

    //Names of days in week
    try {
      let daysNameWrapper = document.getElementById('my_calendar_header');
      if (daysNameWrapper) {
        daysNameWrapper.innerHTML = '';
        for (let i = 0; i < daysInWeek.length; i++) { daysNameWrapper.insertAdjacentHTML('beforeend', `<div><strong>${daysInWeek[i]}</strong> </div>`); }
      }
    } catch (error) {
      console.log(error);
    }

    //All days in month
    try {

      let allDaysWrapper = document.getElementById('my_calendar_days');

      for (let i = 0; i < 6; i++) {
        let oneRowOf7Days = document.createElement('div');
        oneRowOf7Days.classList.add('my_row');
        allDaysWrapper?.append(oneRowOf7Days);
      }

      let calendarRows = allDaysWrapper?.children;

      let startDateOfThisMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      let daysNumberInThisMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

      let daysCounter = 0;

      let dayClickedColor = "rgb(75, 167, 198)";
      let dayDefaultColor = "rgb(255, 169, 83)";

      let targetElementID = '';

      if (calendarRows) {

        for (let i = 0; i < calendarRows.length; i++) {

          let oneRow = calendarRows[i];

          //oneRow.innerHTML = '';
          while (oneRow.lastChild) { oneRow.removeChild(oneRow.lastChild) }

          for (let j = 0; j < daysInWeek.length; j++) {

            let div = document.createElement('div');
            div.innerHTML = `<strong id="day${daysCounter}">${daysCounter + 1}</strong>`;

            let visibility = true;

            if (i == 0) {
              if (j < startDateOfThisMonth.getDay()) { visibility = false; }
              else { visibility = true; daysCounter++; }
            } else { visibility = ++daysCounter <= daysNumberInThisMonth; }

            div.style.visibility = visibility ? 'visible' : 'hidden';

            if (daysCounter == currentDate.getDate()) {
              div.style.backgroundColor = dayClickedColor;
              targetElementID = "day" + (daysCounter - 1);
            }

            /*if (visibility) {
                //By clicking day in calendar it changes color
                div.addEventListener("click", (event) => {
                    let htmlElement = event.target;
  
                    if (htmlElement instanceof HTMLDivElement) {
                        if (htmlElement.style.backgroundColor == dayClickedColor) { htmlElement.style.backgroundColor = dayDefaultColor; }
                        else { htmlElement.style.backgroundColor = dayClickedColor; }
                    }
  
                    console.log("Clicked day: " + htmlElement.innerText);
                });
            }*/

            oneRow.appendChild(div);
          }
        }
      }

      //Find element with ID then scroll to this element
      document.getElementById(targetElementID)?.scrollIntoView({ behavior: "smooth" });

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => { calendarInitialize(); }, [])

  return (
    <div id="my_calendar">
      <div id="my_calendar_header"></div>

      <div id="my_calendar_days">
      </div>

      <div id="my_calendar_footer">
        <div id="my_calendar_footer_year_wrapper">
          <strong>Year: </strong>
          <p></p>
        </div>

        <div id="my_calendar_footer_month_wrapper">
          <strong>Month: </strong>
          <p></p>
        </div>

        <div id="my_calendar_footer_day_wrapper">
          <strong>Day: </strong>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default App;
