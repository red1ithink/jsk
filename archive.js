document.addEventListener("DOMContentLoaded", function () {
  const width = 1000, height = 550;

  // 투영 설정
  const projection = d3.geoMercator()
    .center([10, 20])
    .scale(170)
    .translate([width / 2, height / 2]);

  const path = d3.geoPath().projection(projection);

  const svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

  // 여행한 나라 데이터
  const travelData = {
    "United States": { img: "usa.jpg"},
    "Finland": { img: "finland.jpg"},
    "Italy": { img: "italy.jpg", desc: "Venezia" },
    "Switzerland": { img: "switzerland.jpg"},
    "France": { img: "france.jpg"},
    "Germany": { img: "germany.jpg"},
    "Luxembourg": { img: "luxembourg.jpg"},
    "Belgium": { img: "belgium.jpg"},
    "United Kingdom": { img: "uk.jpg"},
    "Spain": { img: "spain.jpg"},
    "Portugal": { img: "portugal.jpg",desc: "Dive Deeper" },
    "Vietnam": { img: "vietnam.jpg"},
    "South Korea": { img: "korea.jpg"}
  };

  d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json").then(world => {
    const countries = topojson.feature(world, world.objects.countries);

    svg.selectAll("path")
      .data(countries.features)
      .enter().append("path")
      .attr("d", path)
      .attr("fill", d => travelData[d.properties.name] ? "#ff6ec7" : "#415a77") // 방문한 나라는 핑크색, 나머지는 기본 색상
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 0.5)
      .on("mouseover", function (event, d) {
        // 기존 색상을 저장
        const currentColor = d3.select(this).attr("fill");
        d3.select(this).attr("data-original-color", currentColor);

        // 마우스 오버 시 색 변경
        d3.select(this).attr("fill", "#6a83ff");
      })
      .on("mouseout", function (event, d) {
        // 원래 색상으로 복원
        const originalColor = d3.select(this).attr("data-original-color");
        d3.select(this).attr("fill", originalColor);
      })
      .on("click", function (event, d) {
        showCountryInfo(d.properties.name);
      });
  });

  function showCountryInfo(country) {
    if (travelData[country]) {
      document.getElementById("country-name").textContent = country;
      document.getElementById("country-photo").src = `images/${travelData[country].img}`;
      document.getElementById("country-description").textContent = travelData[country].desc || "";
      document.getElementById("dive-deeper-btn").classList.remove("hidden");
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

