<script setup lang="ts"></script>

<template>
  <div class="mx-auto h-screen flex flex-col justify-center items-center">
    <div
      class="h-[150px] w-[150px] flex justify-center items-center border-2 border-dotted border-black mb-2"
    >
      <!-- <i class="fa-solid fa-plus"> </i> -->

      <input
        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        id="picture"
        name="picture"
        type="file"
      />
    </div>

    <h1 class="text-xl font-bold">Add a file to upload</h1>
  </div>
</template>

<style scoped></style>
