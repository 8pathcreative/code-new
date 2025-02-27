import React, { useEffect, useState } from 'react';
import { SEO } from '../components/SEO';
import { supabase } from '../lib/supabase';

const Playground = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('your_table').select('*');
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setData(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Playground Page</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id} className="mb-4">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-gray-600">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playground;