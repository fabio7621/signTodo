<template>
  <div class="sign-wrap">
    <h1 class="sr-only">最實用的線上代辦事項服務</h1>
    <header class="phone-header d-block d-md-block d-lg-none">
      <div class="phone-logo-pic mx-auto">
        <img src="../../public/images/logo.png" alt="logo" />
      </div>
    </header>
    <section class="section-login">
      <div class="login-main">
        <div class="row">
          <div class="col-12 col-md-12 col-lg-6 d-none d-md-none d-lg-block">
            <div class="login-left-pic">
              <img class="w-100" src="../../public/images/left.png" alt="member picture" />
            </div>
          </div>
          <div class="col-12 col-md-12 col-lg-6 d-flex pt-5">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
