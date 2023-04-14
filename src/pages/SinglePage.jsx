import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

const SinglePage = () => {

    const params = useParams();

    const [service, setServise] = useState({});

    useEffect(() => {
        fetch(`https://api.avavion.ru/api/products/${params.id}`)
        .then((r) => r.json())
        .then((data) => setServise(data.data));
    }, []);

    return (
        <main className='single'>
            <NavLink to={`/`}>назад</NavLink>
            <div className='service' key={service.id}>
                <img src={service.image_url} alt={service.name} />
                <div className="right-section">
                    <div className="header">
                        <h2>{service.name}</h2>
                        <ul>
                            <li>
                                Категория: <p>{service.tag}</p>
                            </li>
                            <li>
                                Характеристика: <p>{service.text}</p>
                            </li>
                            <li>
                                Количество: <p>{service.quantity} шт.</p>
                            </li>
                        </ul>
                        
                    </div>
                    <div className="price">
                        {service.price} ₽ 
                        <div className="sale">
                            {service.discount}%
                        </div>
                    </div>
                </div>
                
            </div>
        </main>
    )
}

export default SinglePage