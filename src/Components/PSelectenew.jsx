import "./PSelectenew.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Cards from "./Cards";
import moment from "moment";

export default function PSelectenew() {
  

  const [nextPrayerIndex, setNextPrayerIndex] = useState(2);
  const [remainingTime, setRemainingTime] = useState("");
  const [today, setToday] = useState("");
  const prayersArray = [
		{ key: "Fajr", displayName: "الفجر" },
		{ key: "Dhuhr", displayName: "الظهر" },
		{ key: "Asr", displayName: "العصر" },
		{ key: "Sunset", displayName: "المغرب" },
		{ key: "Isha", displayName: "العشاء" },
	];


  const [timings, settimings] = useState({
    Fajr: "05:51",
    Dhuhr: "12:49",
    Asr: "15:52",
    Maghrib: "18:17",
    Isha: "19:38",
  });
  const [selectcity, setselectcity] = useState({
    displayname: "دمشق",
    apiname: "Dimashq",
  });
  const avilableCitys = [
    {
      displayname: "دمشق",
      apiname: "Dimashq",
    },
    { displayname: "السويداء", apiname: "As Suwaydā'" },
    { displayname: "درعا", apiname: "	Dar'ā" },
    { displayname: "ريف دمشق", apiname: "Rīf Dimashq" },
    { displayname: " اللاذقية", apiname: "Al Lādhiqīyah" },
    { displayname: "حلب", apiname: "	Ḩalab" },
  ];
  const getTimings = async () => {
    const contr = selectcity.apiname;
    console.log("calling the api");
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?city=SYDimashq&country=${contr}`
    );
    settimings(response.data.data.timings);
  };

  useEffect(() => {
    getTimings();
  }, [selectcity]);
	useEffect(() => {
		let interval = setInterval(() => {
			console.log("calling timer");
			setupCountdownTimer();
		}, 1000);

		const t = moment();
		setToday(t.format("MMM Do YYYY | h:mm"));

		return () => {
			clearInterval(interval);
		};
	}, [timings]);
  const setupCountdownTimer = () => {
		const momentNow = moment();

		let prayerIndex = 2;

		if (
			momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
			momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
		) {
			prayerIndex = 1;
		} else if (
			momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
			momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
		) {
			prayerIndex = 2;
		} else if (
			momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
			momentNow.isBefore(moment(timings["Sunset"], "hh:mm"))
		) {
			prayerIndex = 3;
		} else if (
			momentNow.isAfter(moment(timings["Sunset"], "hh:mm")) &&
			momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
		) {
			prayerIndex = 4;
		} else {
			prayerIndex = 0;
		}

		setNextPrayerIndex(prayerIndex);
    const nextPrayerObject = prayersArray[prayerIndex];
		const nextPrayerTime = timings[nextPrayerObject.key];
		const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

		let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

		if (remainingTime < 0) {
			const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
			const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
				moment("00:00:00", "hh:mm:ss")
			);

			const totalDiffernce = midnightDiff + fajrToMidnightDiff;

			remainingTime = totalDiffernce;
		}
		console.log(remainingTime);

		const durationRemainingTime = moment.duration(remainingTime);

		setRemainingTime(
			`${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`
		);
		console.log(
			"duration issss ",
			durationRemainingTime.hours(),
			durationRemainingTime.minutes(),
			durationRemainingTime.seconds()
		);
	};

  const handlechangecity = (event) => {
    const cityobject = avilableCitys.find((city) => {
      return city.apiname === event.target.value;
    });
    setselectcity(cityobject);
  };
  return (
    <div>
      <div className="CardAppBodyStyle">
        <Cards
          imgC={"//timesprayer.com/images/fajr.svg"}
          titleC={"الفجر"}
          dataC={timings.Fajr}
          bodyC={"﷽  وَالصُّبْحِ إِذَا تَنَفَّسَ " }
          rmzC={"AM"}
        />
        <Cards
          imgC={"//timesprayer.com/images/dhuhr.svg"}
          titleC={"الظهر"}
          dataC={timings.Dhuhr}
          bodyC={"﷽  وَأَقِمِ الصَّلاَةَ طَرَفَيِ النَّهَارِ"}
          rmzC={"PM"}
        />
        <Cards
          imgC={"//timesprayer.com/images/asr.svg"}
          titleC={"العصر"}
          dataC={timings.Asr}
          bodyC={" ﷽  أَقِمِ الصَّلَاةَ لِدُلُوكِ الشَّمْسِ"}
          rmzC={"PM"}
        />
        <Cards
          imgC={"//timesprayer.com/images/maghrib.svg"}
          titleC={"المغرب"}
          dataC={timings.Maghrib}
          bodyC={"﷽  إلَى غَسَقِ اللَّيْلِ"}
          rmzC={"PM"}
        />
        <Cards
          imgC={"//timesprayer.com/images/isha.svg"}
          titleC={"العشاء"}
          dataC={timings.Isha}
          bodyC={"﷽ حِينَ تُمْسُونَ"}
          rmzC={"PM"}
        />
      </div>
      <div className="Selectestyle">
        <select
          class="form-select"
          className="publivselcte"
          aria-label="Default select example"
          onChange={handlechangecity}
        >
          <option selected className="opstyle">
            المدينة
          </option>

          {avilableCitys.map((city) => {
            return <option value={city.apiname}>{city.displayname}</option>;
          })}
        </select>
        <div className="obnmstyle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-cursor-fill"
            viewBox="0 0 16 16"
          >
            <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
          </svg>
        </div>
      </div>
      <div className="mmm">
        <div>
          <h1> {selectcity.displayname}</h1>
          <br />
          <h4>{today}</h4>
        </div>
        <div>
          <h1>متبقي حتى صلاة{" "}
							{prayersArray[nextPrayerIndex].displayName}</h1>
              <h1>{remainingTime}</h1>
        </div>
      </div>
    </div>
  );
}
