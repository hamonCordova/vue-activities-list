export const activitiesLocalStorage = {
    created() {
        this.localStorageName = 'activities';
    },
    methods: {
        getActivities() {
            let items = localStorage.getItem(this.localStorageName);
            if(items)
                return JSON.parse(items); 
            else
                return [];
        },
        removeActivity(id) {
            let items = this.getActivities();
            let updatedItems = items.filter(v => {
                return v.id !== id;
            });

            localStorage.setItem(this.localStorageName, JSON.stringify(updatedItems));
            return updatedItems;
        },
        insertActivity(activity) {
            let currentItems = this.getActivities();
            currentItems.unshift(activity);
            localStorage.setItem(this.localStorageName, JSON.stringify(currentItems));
        },
        updateActivity(newActivity) {
            
           let currentItems = this.getActivities();
           let index = currentItems.findIndex(v => v.id == newActivity.id);

           currentItems[index] = newActivity;
           localStorage.setItem(this.localStorageName, JSON.stringify(currentItems));
        } 
    }
}