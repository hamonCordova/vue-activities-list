<template>
    <v-app>
      <v-content>

        <AppHeader />

        <v-container>
          <v-flex>
            <v-row>
              <v-col cols="12" md="6" order="2" order-md="1">
                <AppActivitiesList id="todoList" ref="activitiesList" :editingItem="editingItem"
                 @onEdit="onEmitForEdit" @onRemove="onRemoved"/>
              </v-col>
              <v-col cols="12" md="6" order="1" order-md="2">
                <v-content id="form-main-content">
                  <template>
                    <transition name="scale-transition" mode="out-in">

                      <AppFormAddEditActivities v-if="isEditing == true && isShowAddEdit" :isEdit="true"
                      ref="formEdit" @cancelClicked="displayForm(false)"
                        @onEdited="onEdited" class="form" :editingItem="editingItem" key="formEdit" />

                      <AppFormAddEditActivities v-else-if="isEditing == false && isShowAddEdit" ref="formAdd"
                      @onInsert="onInserted" class="form" @cancelClicked="displayForm(false)" key="formAdd"  />

                    </transition>

                  </template>
                </v-content>
              </v-col>
            </v-row>
          </v-flex>
        </v-container>
        
        <v-btn @click="showAddForm()" color="green" dark bottom right fab fixed>
          <v-icon>mdi-plus</v-icon>
        </v-btn>

      </v-content>

    </v-app>
</template>

<script>

import AppHeader from "./components/AppHeader";
import AppActivitiesList from "./components/AppActivitiesList";
import AppFormAddEditActivities from "./components/AppFormAddEditActivities";

export default {
  name: 'App',
  data() {
    return {
      isEditing: false,
      isShowAddEdit: false,
      editingItem: {}
    }
  },
  components: {
    AppHeader,
    AppActivitiesList,
    AppFormAddEditActivities
  },
  methods: {
    refreshTodoList() {
      this.$refs.activitiesList.refreshActivitiesList();
      this.isEditing = false;
    },
    onEmitForEdit(item) {
      this.editingItem = item;
      this.showEditForm(item);
    },
    onEdited() {
        this.isEditing = false;
        this.displayForm(false);
        this.refreshTodoList();
    },
    onInserted() {
      this.refreshTodoList();
    },
    onRemoved(id) {
      if(this.editingItem && this.editingItem.id === id) {
          this.displayForm(false); 
      }
    },
    displayForm(show) {
      this.isShowAddEdit = show;
      if(show) this.scrollToForm();
    },
    showAddForm() {
      this.editingItem = {};
      this.isEditing = false;
      this.displayForm(true);
    },
    showEditForm() {
        this.isEditing = true;
        this.displayForm(true);
    },
    scrollToForm() {
      // Scroll to form element. This is usefull on mobile.
      // The "Set time out" is needed because the element need to be load after scroll into them
      setTimeout(() => {
        let formContent = this.$el.querySelector("#form-main-content");
        formContent.scrollIntoView();
      }, 10);
    }
  },
};
</script>
<style lang="scss" scoped>

  #form-main-content {
    width: 100%;
  }
  
  #todoList {
    width: 100%;
  }

  .form {
    width: 100%;
  }

</style>
