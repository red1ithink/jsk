function toggleMenu() {
    const menu = document.getElementById('menu');
    if (menu.style.maxHeight === '0px' || !menu.style.maxHeight) {
      menu.style.maxHeight = '300px'; // 메뉴 표시 (높이는 내용에 따라 조정)
    } else {
      menu.style.maxHeight = '0px'; // 메뉴 숨김
    }
  }
  