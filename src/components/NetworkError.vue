<template>
  <div>
    <h1>Oops!</h1>
    <h3>There is a network problem at this time. Please try later.</h3>
    <router-link :to="{ name: 'event-list'}">Back to the home page</router-link>
  </div>
</template>
