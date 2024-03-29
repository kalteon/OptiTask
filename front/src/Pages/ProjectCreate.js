


import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function ProjectCreate() {
    const navigate = useNavigate();
    const [projectName, setProjectName] = useState('');
    const [deadline, setDeadline] = useState('');
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState('');

    const styles = {

        container: {

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // 중앙 정렬
            justifyContent: 'center', // 수직으로 중앙 정렬
            minHeight: '90vh', // 전체 화면 높이
        },
        input: {
            margin: '10px 0', // 상하 마진
            padding: '10px', // 패딩
            width: '60%', // 너비
            fontSize: '1.2em', // 글자 크기
        },
        button: {
            margin: '10px 0', // 상하 마진
            padding: '10px 20px', // 패딩
            fontSize: '1.2em', // 글자 크기
        },
        todoList: {
            listStyle: 'none', // 리스트 스타일 제거
        },
        todoItem: {
            padding: '5px', // 패딩
            fontSize: '1.2em', // 글자 크기
        },
        todoListContainer: {
            maxHeight: '200px', // 할 일 목록의 최대 높이 설정
            overflowY: 'auto', // 세로 스크롤바 설정
            margin: '20px 0', // 상하 마진
        },
    };

    const handleProjectNameChange = (event) => {
        setProjectName(event.target.value);
    };

    const handleDeadlineChange = (event) => {
        setDeadline(event.target.value);
    };

    const handleTodoInputChange = (event) => {
        setTodoInput(event.target.value);
    };


    const handleAddTodo = () => {
        if (todoInput.trim() !== '') {
            // 문자열을 직접 todos 배열에 추가합니다.
            setTodos([...todos, todoInput.trim()]);
            setTodoInput('');
        }
    };

    // 서버로 새 프로젝트 데이터를 POST 요청으로 전송합니다.
    const handleSubmit = () => {

        // ToDo 목록을 문자열 배열로 변환합니다.
        const userId = 23;
        // 프로젝트 데이터 객체를 생성합니다.
        const projectData = {
            userId,
            projectName,
            todoList: todos,
            deadline
        };
        axios.post(`https://optitask.site/api/project`, JSON.stringify(projectData), {
            headers: { "Content-Type": "application/json" },
        })
            .then(response => {
                // 요청이 성공했으면 홈 페이지로 이동합니다.
                navigate('/');
            })
            .catch(error => {
                // 요청이 실패했다면 오류 메시지를 표시할 수 있습니다.
                console.error('Error:', error);
            });
    };


    return (

        <div style={styles.container}>
            <h1 onClick={() => navigate("/")} style={{ cursor: 'pointer', fontSize: '50px', textAlign: 'center', marginBottom: '40px' }}>Project Creator</h1>

            <input type="text" name="projectName" placeholder="Project Name" value={projectName} onChange={handleProjectNameChange} style={styles.input} />
            <label htmlFor="deadline">Deadline</label>
            <input type="date" name="deadline" value={deadline} onChange={handleDeadlineChange} style={styles.input} />
            <div>
                <input type="text" name="todoInput" placeholder="Add ToDo" value={todoInput} onChange={handleTodoInputChange} style={styles.input} />
                <button onClick={handleAddTodo} style={styles.button}>Add</button>
            </div>

            <div style={styles.todoListContainer}>
                <ul style={styles.todoList}>
                    {todos.map((todo, index) => (
                        // todo는 이제 문자열이므로, 직접 렌더링합니다.
                        <li key={index} style={styles.todoItem}>{todo}</li>
                    ))}
                </ul>
            </div>

            <button onClick={handleSubmit} style={styles.button}>Complete</button>
        </div>

    );
}

export default ProjectCreate;

