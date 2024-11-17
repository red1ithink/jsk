function toggleMenu() {
  const menu = document.getElementById("menu");
  if (menu.style.maxHeight === "200px") { // 목록 숨김 상태로 변경
    menu.style.maxHeight = "0";
  } else { // 목록 표시 상태로 변경
    menu.style.maxHeight = "200px";
  }
}
