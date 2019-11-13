<template>
    
    <v-content>
        <BaseTitleHeader title="Your Activities List" subtitle="Checkout your activities and do what you have to do :D" />
        <v-simple-table class="table-with-border" height="500px">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Completed</th>
                        <th class="text-left">Title</th>
                        <th class="text-left">Description</th>
                        <th class="text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item.id" :class="{selectedRow: editingItem.id == item.id}">
                        <td>
                            <v-checkbox :color="editingItem.id == item.id ? 'green lighten-4' : 'green'"
                                v-model="item.completed" @change="setComplete(item, $event)">
                            </v-checkbox>
                        </td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.description }}</td>
                        <td class="text-right">
                            <v-icon @click="emitEdit(item.id)" class="icon edit">mdi-history</v-icon>
                            <v-icon @click="removeAndEmit(item.id)" class="icon remove">mdi-delete</v-icon>
                        </td>
                    </tr>                    
                </tbody>
            </template>
    </v-simple-table>
  </v-content>

</template>

<script>

import BaseTitleHeader from './BaseTitleHeader';
import {activitiesLocalStorage} from '../mixins/activitiesLocalStorage.js';

export default {
    mixins: [activitiesLocalStorage],
    props: {
        editingItem: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            items: [],
        }
    },
    components: {
        BaseTitleHeader
    },
    created() {
        this.items = this.getActivities();
    },
    methods: {
        refreshActivitiesList() {
            this.items = this.getActivities();
        },
        removeAndEmit(id) {
            this.items = this.removeActivity(id);
            this.$emit('onRemove', id);
        },
        emitEdit(id) {
            let item = this.items.find(v => v.id == id);
            this.$emit('onEdit', item);
        },
        setComplete(item, isCompleted) {
            item.completed = isCompleted;
            this.updateActivity(item);
            this.refreshActivitiesList();
        }
    },
    computed: {
        selectedRowClass() {
            return this.editingItem ? 'selectedRow' : '';
        }
    }
}
</script>

<style lang="scss" scoped>

    .table-with-border {
        margin-top: -20px;
        padding-top: 40px;
        border: 1px solid #ddd !important;
        box-shadow: 1px 1px 6px 1px rgba(0,0,0,0.1);
        border-radius: 10px;
        width: 100% !important;
        transition: width linear 1s !important;
    }

    .selectedRow {
        background: #37A0F3;
        color: #fff;

        &:hover {
            background: rgba(55, 162, 243, 0.9) !important;
            color: #fff;
            .icon {
                color: #fff;
            }
        }

        .icon {
            color: #fff;
        }

    }

    .icon {

        margin: 5px;
        transition: linear 100ms;
        cursor: pointer;

        &.edit {
            &:hover {
                color: rgb(15, 103, 170);
            }
        }

        &.remove {
            &:hover {
                color: rgb(216, 18, 18);
            }
        }

    }

</style>