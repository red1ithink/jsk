document.addEventListener("DOMContentLoaded", function () {
    const width = 1000, height = 550;
  
    // 🌍 투영 조정: 세계 전체가 보이도록 확대 조정
    const projection = d3.geoMercator()
      .center([10, 20]) // 중심 이동 (미국 포함)
      .scale(170)
      .translate([width / 2, height / 2]);
  
    const path = d3.geoPath().projection(projection);
  
    const svg = d3.select("#map").append("svg")
      .attr("width", width)
      .attr("height", height);
  
    // 여행한 나라 데이터
    const travelData = {
      "United States": { img: "usa.jpg", desc: "Explored the bustling streets of NYC and the Grand Canyon!" },
      "Finland": { img: "finland.jpg", desc: "Saw the Northern Lights in Lapland!" },
      "Italy": { img: "italy.jpg", desc: "Visited Rome, Venice, and Florence." },
      "Switzerland": { img: "switzerland.jpg", desc: "Enjoyed the breathtaking Alps!" },
      "France": { img: "france.jpg", desc: "Saw the Eiffel Tower and enjoyed Parisian cafés." },
      "Germany": { img: "germany.jpg", desc: "Visited Berlin and Munich's Oktoberfest!" },
      "Luxembourg": { img: "luxembourg.jpg", desc: "Explored the picturesque city of Luxembourg." },
      "Belgium": { img: "belgium.jpg", desc: "Tasted the best waffles in Brussels!" },
      "United Kingdom": { img: "uk.jpg", desc: "London's Big Ben and Scotland's Highlands!" },
      "Spain": { img: "spain.jpg", desc: "Enjoyed the beaches of Barcelona and Madrid’s culture." },
      "Portugal": { img: "portugal.jpg", desc: "Explored Lisbon and Porto’s stunning views." },
      "Vietnam": { img: "vietnam.jpg", desc: "Cruised through Ha Long Bay!" },
      "South Korea": { img: "korea.jpg", desc: "My home! Explored Jeju and Seoul’s vibrant life." }
    };
  
    // 지도 불러오기
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json").then(world => {
      const countries = topojson.feature(world, world.objects.countries);
  
      svg.selectAll("path")
        .data(countries.features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", d => travelData[d.properties.name] ? "#ff6ec7" : "#415a77") // 방문한 나라는 핑크색
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 0.5)
        .on("mouseover", function () {
          d3.select(this).attr("fill", "#6a83ff"); // 호버 효과
        })
        .on("mouseout", function (event, d) {
          d3.select(this).attr("fill", travelData[d.properties.name] ? "#ff6ec7" : "#415a77");
        })
        .on("click", function (event, d) {
          showCountryInfo(d.properties.name);
        });
    });
  
    // 나라 클릭 시 정보 표시
    function showCountryInfo(country) {
      const infoBox = document.getElementById("info-box");
      if (travelData[country]) {
        document.getElementById("country-name").textContent = country;
        document.getElementById("country-photo").src = `images/${travelData[country].img}`;
        document.getElementById("country-description").textContent = travelData[country].desc;
        infoBox.classList.remove("hidden");
      } else {
        infoBox.classList.add("hidden");
      }
    }
  });
  

  function toggleMenu() {
    const menu = document.getElementById('menu');
    if (menu.style.maxHeight === '0px' || !menu.style.maxHeight) {
      menu.style.maxHeight = '300px'; // 메뉴 표시 (내용 크기에 맞게 조정)
    } else {
      menu.style.maxHeight = '0px'; // 메뉴 숨김
    }
  }
  