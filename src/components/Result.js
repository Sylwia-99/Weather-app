import React from 'react';
import './Result.css';

const Result = (props) => {
    const { date, city, sunrise, sunset, temp, tempFeels, pressure, wind, clouds, err} = props.weather;

    let content = null;

    if(!err && city){

        const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
        const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
        content = (
            <>
                <h3>Wyniki wyszukiwania dla miasta <em>{city}</em></h3>
                <h4>Dane dla dnia i godziny: {date}</h4>
                <h4>Aktualna temperatura: {temp} &#176;C</h4>
                <h4>Temperatura odczuwalna: {tempFeels} &#176;C</h4>
                <h4>Wschód słońca: {sunriseTime}</h4>
                <h4>Zachód słońca: {sunsetTime}</h4>
                <h4>Szybkość wiatru: {wind} m/s</h4>
                <h4>Ciśnienie: {pressure} hPa</h4>
                <h4>Zachmurzenie: {clouds} %</h4>
            </>
        )
    }
    return(
        <div className="Result">
            {err ? `Nie mamy w bazie miasta: ${city}` : content}
        </div>
    );
}

export default Result;