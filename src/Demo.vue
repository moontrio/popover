<script setup lang="ts">
import { Popover, PopoverContent, PopoverReference } from './Popover'
</script>

<template>
  <div class="container">
    <div style="height: 240px; width: 1px;" />
    <div>
      <Popover placement="top" strategy="fixed" :offset="4">
        <span>blah blah</span>
        <PopoverReference style="display: inline-block;">
          <span class="reference">
            reference
          </span>
        </PopoverReference>
        <PopoverContent>
          <div class="floating">
            floating
          </div>
        </PopoverContent>
      </Popover>
    </div>
    <div style="height: 400px; width: 1px;" />
  </div>
</template>

<style>
.reference {
  display: inline-grid;
  place-items: center;
  padding: 4px 8px;
  color: #fff;
  background-color: #272934;
  border-radius: 6px;
}

.floating {
  display: grid;
  place-items: center;
  width: 100px;
  height: 100px;
  border: 2px dashed #272934;
  border-radius: 6px;
}

.container {
  display: grid;
  place-items: center;
  height: 320px;
  background: #f1f5f9;
  overflow: auto;
}
</style>
