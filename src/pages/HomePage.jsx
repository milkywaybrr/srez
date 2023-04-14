import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import FormatMoney from "../utils/FormatMoney";

const HomePage = () => {

    const [services, setServices] = useState([]);

    const [tags, setTags] = useState([]);

    const fetchServices = async () => {
        const r = await fetch('https://api.avavion.ru/api/products');

        const data = await r.json();

        setServices(data.data);
    }

    const fetchTags = async () => {
        const r = await fetch('https://api.avavion.ru/api/tags');

        const data = await r.json();

        setTags(data.data);
    }


    useEffect(() => {
        fetchTags();
        fetchServices();
    }, []);

    console.log(services);

    const [query, setQuery] = useState("");

    

    const filteredProducts = services.filter((item) => item.name.toLowerCase().includes(query));

    const onChangeQuery = (event) => {
        setQuery(event.target.value.toLowerCase());
    }

    return (

        

        <main>
            <input value={query} onChange={(e) => onChangeQuery(e)} type="text" placeholder="Поиск... " />
            <ul className="tags">
                {
                    tags.map((tag) => {
                        return (
                            <li className="tag" key={tag.id}>
                                <a href=''>
                                    {tag.name}
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="services">
                {
                        filteredProducts.length ? 
                        (
                            filteredProducts.map((service) => {
                                return (
                                    <div className="service" key={service.id}>
                                        <img src={service.image_url} alt={service.name} />
                                        <div className="content">
                                            <div className="head">
                                                <h3>{service.name}</h3>
                                                <p>{service.short_text}</p>
                                            </div>
                                            <div className="footer">
                                                <div className="price">
                                                    {FormatMoney(service.price, service.sale)}
                                                    <div className="sale">
                                                        {service.discount} %
                                                    </div>
                                                </div>
                                                <NavLink to={`/services/${service.id}`}>подробнее</NavLink>
                                            </div>
                                            
                                        </div>
                                    </div>
                                )
                            })
                        )

                        :

                        <h2 className="empty">По вашему запросу "{query}" ничего не найдено!</h2>
                        
                    }
                
            </div>
        </main>
    )
}

export default HomePage