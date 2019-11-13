<template>
  <v-content id="form-content">

    <BaseTitleHeader :color="mainColor" :title="formTitle" :subtitle="formSubtitle" />
    
    <v-form id="form" ref="form" v-model="formIsValid" lazy-validation>
        <v-text-field v-model="title" label="Title" :rules="titleRules" outlined required ref="titleField"></v-text-field>
        <v-text-field v-model="description" label="Description" :rules="descriptionRules" outlined required></v-text-field>
        <v-btn @click="validate" :disabled="!formIsValid" :color="mainColor"
             class="mr-4 white--text" type="submit">{{ buttonText }}</v-btn>
        <v-btn v-show="true" color="red" class="white--text" @click="$emit('cancelClicked')">Cancel</v-btn>
    </v-form>
  </v-content>
</template>

<script>

import BaseTitleHeader from './BaseTitleHeader';
import {activitiesLocalStorage} from '../mixins/activitiesLocalStorage.js';

export default {
    components: {
        BaseTitleHeader
    },
    mixins: [activitiesLocalStorage],
    props: {
        isEdit: {
            type: Boolean,
            default: false,
        },
        editingItem: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            title: '',
            description: '',
            formIsValid: true,
            titleRules: [
                (v) => !!v || 'Title is Required',
                (v) => {
                    if(v) v = v.trim();
                    return v ? true : false || 'Title is Required'
                }
            ],
            descriptionRules: [
                 (v) => !!v || 'Description is Required',
                 (v) => {
                    if(v) v = v.trim();
                    return v ? true : false || 'Description is Required';
                 }
            ]
        }
    },
    mounted() {
        if(!this.isEdit) {
            this.reset();
        }
    },
    watch: {
        editingItem: {
            immediate: true,
            handler() {
                if(this.editingItem != null) {
                    this.title = this.editingItem.title;
                    this.description = this.editingItem.description;
                } 
            }
        } 
    },
    methods: {
       validate() {
           if(this.$refs.form.validate()) {
                this.isEdit ? this.editAndEmit() : this.insertAndEmit();
           }
       },
       editAndEmit() {

           let newItem = Object.assign({}, this.editingItem);
           newItem.title = this.title;
           newItem.description = this.description;

           this.updateActivity(newItem);
           this.$emit('onEdited');
           this.$refs.form.reset();

       },
       insertAndEmit() {

           let activitie = {
               id: this.getUniqueID(),
               title: this.title,
               description: this.description,
               completed: false
           };

           this.insertActivity(activitie);

           this.$emit('onInsert');
           this.reset();
       },
       getUniqueID() {
           return new Date().getTime();
       },
       reset() {
           this.$refs.form.reset();
           this.$refs.titleField.focus();
       }
    },
    computed: {
        formTitle() {
            return this.isEdit ? 'Update Your Activity' : 'Add New Activity';
        },
        formSubtitle() {
            return this.isEdit ? 'Update the fields and click on update button' : 'Fill the fields and click on insert button';
        },
        buttonText() {
             return this.isEdit ? 'Update' : 'Insert';
        },
        mainColor() {
            return this.isEdit ? 'blue' : 'green';
        }

    }
    
}
</script>

<style lang="scss" scoped>

    #form {
        margin-top: -20px;
        padding: 40px;
        border: 1px solid #ddd !important;
        box-shadow: 1px 1px 6px 1px rgba(0,0,0,0.1);
        border-radius: 10px;
    }

</style>