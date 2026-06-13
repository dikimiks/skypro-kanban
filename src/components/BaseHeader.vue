<template>
  <header class="header">
    <div class="container">
      <div class="header__block">
        <div class="header__logo _show _light">
          <a href="" target="_self">
            <img src="/images/logo.png" alt="logo" />
          </a>
        </div>
        <div class="header__logo _dark">
          <a href="" target="_self">
            <img src="/images/logo_dark.png" alt="logo" />
          </a>
        </div>
        
        <nav class="header__nav">
          <button class="header__btn-main-new _hover01">
            <a href="#popNewCard">Создать новую задачу</a>
          </button>
          
          <a href="#user-set-target" class="header__user _hover02">
            Ivan Ivanov
          </a>
          
          <div class="header__pop-user-set pop-user-set" id="user-set-target">
            <p class="pop-user-set__name">Ivan Ivanov</p>
            <p class="pop-user-set__mail">ivan.ivanov@gmail.com</p>
            <div class="pop-user-set__theme">
              <p>Темная тема</p>
              <input type="checkbox" class="checkbox" name="checkbox" />
            </div>
            <button type="button" class="_hover03">
              <a href="#popExit">Выйти</a>
            </button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  margin: 0 auto;
  background-color: var(--color-white);
}

.header__block {
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  padding: 0 10px;
}

.header__logo img {
  width: 85px;
}

.header__nav {
  max-width: 290px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__btn-main-new {
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  margin-right: 20px;
  cursor: pointer;
}

.header__btn-main-new a {
  color: var(--color-white);
  text-decoration: none;
}

.header__user {
  height: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-primary);
  text-decoration: none;
  cursor: pointer;
}

.header__user::after {
  content: "";
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 1px;
  border-left: 1.9px solid var(--color-primary);
  border-bottom: 1.9px solid var(--color-primary);
  transform: rotate(-45deg);
  margin: -6px 0 0 5px;
  padding: 0;
}

.header__pop-user-set {
  display: none;
  position: absolute;
  top: 61px;
  right: 0;
  width: 213px;
  height: 205px;
  border-radius: 10px;
  border: 0.7px solid var(--color-border);
  background: var(--color-white);
  box-shadow: 0px 10px 39px 0px rgba(26, 56, 101, 0.21);
  padding: 34px;
  text-align: center;
  z-index: 2;
}

@media screen and (max-width: 495px) {
  .header__btn-main-new {
    z-index: 3;
    position: fixed;
    left: 16px;
    bottom: 30px;
    top: auto;
    width: calc(100vw - 32px);
    height: 40px;
    margin-right: 0;
  }
}
</style>