let taskTitle = document.getElementById("task-title-input");
        let taskStatus = document.getElementById("task-status-select");
        let taskTitleUpdated = document.getElementById("task-title-update-input");
        let taskStatusUpdated = document.getElementById("task-status-update-select");
        let taskContainer = document.querySelector(".tasks-container");
        let currentTaskId;
        let tasks = [];
        const tasksHtml = [];
        

        async function postTask(){

            try{
                const response = await fetch("http://localhost:8888/api/task",{
                    method: 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        "taskName": taskTitle.value,
                        "completed": taskStatus.value
                    })
                });
                if(!response.ok){
                    throw new Error("Could not post task!");
                }
                console.log("Tarefa criada");
                getTask();
            }catch(error){
                console.error(error);
            }
        }

        async function getTask() {
            try{
                const response = await fetch("http://localhost:8888/api/task");
                if(!response.ok){
                    throw new Error("Failed to fetch");
                }
                const tasksJson = await response.json();
                tasks.push((tasksJson));
                
                getTasksHtml();
            }catch(error){
                console.error(error);
            }
        }


        async function getTaskById(taskId) {
            try{
                const response = await fetch(`http://localhost:8888/api/task/${taskId}`);
                if(!response.ok){
                    throw new Error("Failed to get specific task");
                }
                return response;
            }catch(error){
                console.error(error);
            }
        }


        async function putTask(taskId) {
            try{
                const response = await fetch(`http://localhost:8888/api/task/${taskId}`, {
                    method: 'PUT',
                    headers :{
                        'Content-Type': 'application/json'
                    },
                    body : JSON.stringify({
                        "taskName": taskTitleUpdated.value,
                        "completed": taskStatusUpdated.value
                    })
                });
                if(!response.ok){
                    throw new Error("Could not put task");
                }
                getTask();
                

            }catch(error){
                console.error(error);
            }
            
        }

        async function changeTaskStatus(taskId) {
            try{
                const response = await(getTaskById(taskId));
                if(!response.ok){
                    throw new Error("Failed to fetch");
                }
                const json = await response.json();
                let invertCondition;
                if(json.completed == true){
                    invertCondition = false;
                }else{
                    invertCondition = true;
                }
                const teste = await fetch(`http://localhost:8888/api/task/${taskId}/${invertCondition}`);
                
                
            }catch(error){
                console.error(error);
            }
        }

        async function deleteTask(taskId) {
            try {
                const response = await fetch(`http://localhost:8888/api/task/${taskId}`, {
                    method: 'DELETE'
                });
                if(!response.ok){
                    throw new Error("Failed to delete the task");
                }
            getTask();
            } catch (error) {
                console.error(error);
            }
        }

        function getTasksHtml(){
           let html = '';
           tasks.forEach(task =>{
            for (let index = 0; index < task.length; index++) {

                html += `<div class="task">
                            <div class="left">
                            <button class="checkbox" onclick="changeTaskStatus(${task[index].id})">✓</button>
                            <p class="task-name">${task[index].taskName}</p>
                            </div>
                            <div class="right">
                                <button class="delete-button" onclick="deleteTask(${task[index].id})">D</button>
                                <button class="edit-button" onclick="showUpdateModal(), changeCurrentTask(${task[index].id})">E</button>
                            </div>
                           </div>`;
            }})
            taskContainer.innerHTML = html;
            tasks = [];
        }


        function changeCurrentTask(taskId){
            currentTaskId = taskId;
        }

        function showTask(className){
            showAddTask(className);
            postTask();
        }

        function showUpdateModal(){
            let modal = document.querySelector(".update-container");
            if(modal.style.visibility === "visible"){
                modal.style.visibility = "hidden";
            }else{
                modal.style.visibility = "visible";
            }
        }

        function showPostModal(){
            let modal = document.querySelector(".post-container");
            if(modal.style.visibility === "visible"){
                modal.style.visibility = "hidden";
            }else{
                modal.style.visibility = "visible";
            }
        }
        


        function showAddTask(className){
            let modal = document.querySelector(`.${className}`);
            if(modal.style.visibility === "visible"){
                modal.style.visibility = "hidden";
            }else{
                modal.style.visibility = "visible";
            }
        }


        

        getTask();