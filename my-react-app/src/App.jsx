import { useEffect, useState } from "react";

function App() {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/menu")
            .then(response => response.json())
            .then(data => setMenu(data));
    }, []);

    return (
        <div>
            <h1>メニュー</h1>
            <ul>
                {menu.map(item => (
                    <li key={item.foodName}>
                        <img src={item.foodImageUrl} alt={item.foodName} width="100" />
                        {item.foodName} - {item.price}円
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
