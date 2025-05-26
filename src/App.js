import React, { useEffect, useState } from 'react';
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore';
import { auth, provider, signInWithPopup, signOut, db } from './firebase';


function App() {
  const [incidents, setIncidents] = useState([]);
  const incidentsRef = collection(db, 'incidents');

  useEffect(() => {

    console.log("AA", process.env.REACT_APP_FIREBASE_API_KEY);

    
    const q = query(incidentsRef, orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setIncidents(list);
    });
    return () => unsubscribe();
  }, []);


  const daysSinceLastIncident = () => {
    if (incidents.length === 0) return '-';
    const last = incidents[0].date.toDate();
    const now = new Date();
    const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const defconColorByDays = (days) => {
    if (days < 2) return "text-red-700";
    if (days >= 2 && days <= 5) return "text-yellow-800";
    if (days > 5) return "text-green-800";
    return 'text-gray-900';
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        
        <div className="sm:mx-auto sm:w-full sm:max-w-[500px] bg-white rounded-2xl shadow-md p-10">
          <div className="">
            <img src={ process.env.PUBLIC_URL +  '/cashea.png'} alt="Cashea" className="h-12 mx-auto mb-3" />
          </div>
          <div className="flex flex-col items-center py-6">
            <h1 className={`text-[200px] leading-none ${defconColorByDays(daysSinceLastIncident())}`}>{daysSinceLastIncident()}</h1>
            <p className={`text-sm ${defconColorByDays(daysSinceLastIncident())}`}>dias sin interrupciones</p>
          </div>

          <div className="rounded-md bg-red-50 p-4 mt-6">
            <div className="flex">
              <div className="shrink-0">
                <svg className="size-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-red-800">Últimas Interrupciones</h3>
                <div className="mt-2 text-sm text-red-700  gap-3 flex flex-col">
                  {incidents.map(incident => (
                  <div  key={incident.id} className="flex justify-between gap-2">
                    <div className='flex flex-col gap-1'>
                      <span>{incident.date.toDate().toLocaleString()}</span>
                      {incident.note && <span className="text-red-500 text-xs">{incident.note}</span>}
                    </div>
                    {incident.jira_ticket && <a
                      href={incident.jira_ticket}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-red-700 underline hover:text-red-600"
                    >Ticket</a>}
                  </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
