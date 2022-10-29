const submitBtn = document.getElementById("submitBtn");
const cityname = document.getElementById("cityname");
const citynamee = document.getElementById("city-name");
const datahide = document.getElementsByClassName("data-hide");
const temp = document.getElementById("temp");
const tempstatus = document.getElementById("temp-status");

const getInfo = async(event)=>{
    event.preventDefault();  //This is because if we search anything then form automatically redirect in another page(see in url)
    //pune pachi '&' karyu kemke multiple parameters pass karva(link ma) '&' karvu pade
    //units=matric karyu kemke data celcius ma madse
    const cityval = citynamee.value;
    if(cityval === ""){
        cityname.innerText = "Please Write the name before search";
        temp.innerText = "";
        tempstatus.innerText = "";
    }
    else{
        try
        {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityval}&units=metric&appid=68fbfbe721337edbf04e5c3321cee271`;
                const response = await fetch(url);  //We have used fetch() because Data api through avse and apde wait karisu tya sudhi bija kam thata rese
                const data = await response.json(); //It will convert data into javascript object
                const arrData = [data] //For accessing its members, we convert it in array
                datahide[0].style.visibility = "visible";

                cityname.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;   
                temp.innerHTML =`<span>${arrData[0].main.temp}</span><sup>o</sup>C`  ;
                //This will get the data from api    

                const tempMode = arrData[0].weather[0].main;

                // Condition to check sunny or cloudy
                if(tempMode === 'Clear')
                {
                    tempstatus.innerHTML = "<i class='fas fa-sun' style='color:#eccc68;'></i>"
                }
                else if(tempMode === 'Clouds')
                {
                    tempstatus.innerHTML = "<i class='fas fa-cloud' style='color:#f1f2f6;'></i>"
                }
                else if(tempMode === 'Rain')
                {
                    tempstatus.innerHTML = "<i class='fas fa-cloud-rain' style='color:#a4b0be;'></i>"
                }
                else
                {
                    tempstatus.innerHTML = "<i class='fas fa-sun' style='color:#eccc68;'></i>"
                }
        }
        catch{
          cityname.innerText = "Plz enter the city name properly";
          tempstatus.innerHTML = "<i class='fa fa-cloud' aria-hidden='true'></i>";
          temp.innerHTML = "<p><span>0</span><sup>o</sup>C</p>"
        //   datahide[0].style.visibility = "hidden";

        }
    }
}

submitBtn.addEventListener("click",getInfo);