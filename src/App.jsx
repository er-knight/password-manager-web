import { useState } from "react"

// eslint-disable-next-line react/prop-types
function UploadScreen({ onSave }) {
  return (
    <div className="m-2 font-['DM_Sans']">
      {/* https://flowbite.com/docs/forms/file-input/#dropzone */}
      <div className="flex items-center justify-center">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to Upload</span> or Drag and Drop</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" />
        </label>
      </div>
      {/* https://flowbite.com/docs/forms/input-field/#input-fields */}
      <div className="mt-2">
        <label htmlFor="password" className="block pl-2 text-sm font-medium text-gray-900">Password</label>
        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="password" required></input>
      </div>
      {/* https://flowbite.com/docs/components/buttons/#default-button */}
      <button type="button" className="w-full mt-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={() => onSave()}>Save</button>
    </div>
  )
}

function PasswordModal({ isVisible, setIsVisible, setGlobalPassword, onClose }) {
  const [password, setPassword] = useState('')
  
  if (!isVisible) {
    return <></>
  }

  return (
    <div className="flex w-screen h-screen absolute top-0 left-0 items-center">
      <div>
        <label>Password</label>
        <input type="password" value={password} onInput={(event) => setPassword(event.target.value)} placeholder="Enter password"></input>
        <button type="button" onClick={() => {
          setGlobalPassword(password) 
          setIsVisible(false)
          onClose()
        }}>Save</button>
      </div>
    </div>
  )
}

function OptionsScreen({ onClick }) {
  return (
    <div className="flex flex-col box-border h-screen w-screen justify-center items-center font-['DM_Sans'] text-lg font-medium">
      <div className="flex justify-center items-center border rounded p-4 mb-1 w-[50vw] md:h-16 h-[25vw] cursor-pointer hover:bg-slate-100" onClick={() => onClick()}>
        <p className="text-center">Upload Existing File</p>
      </div>
      <div className="flex justify-center items-center border rounded p-4 mt-1 w-[50vw] md:h-16 h-[25vw] cursor-pointer hover:bg-slate-100" onClick={() => onClick()}>
        <p className="text-center">Create New File</p>
      </div>
    </div>
  )
}

function MainScreen() {

  const [records,] = useState([
    {
      url: "google.com",
      email: "johndoe@google.com"
    },
    {
      url: "microsoft.com",
      email: "johndoe@microsoft.com"
    },
    {
      url: "apple.com",
      email: "johndoe@apple.com"
    },
    {
      url: "microsoft.com",
      email: "johndoe@microsoft.com"
    },
    {
      url: "apple.com",
      email: "johndoe@apple.com"
    },
    {
      url: "microsoft.com",
      email: "johndoe@microsoft.com"
    },
    {
      url: "apple.com",
      email: "johndoe@apple.com"
    }
  ])
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  function handleClick(index) {
    setIsModalVisible(true)
    setSelectedIndex(index)
  }

  return (
    <>
      <Modal visible={isModalVisible} record={records[selectedIndex]} index={selectedIndex} onClose={() => setIsModalVisible(false)}></Modal>
      <div className="w-screen h-screen overflow-hidden flex flex-col p-2 font-['DM_Sans']">
        <div className="border-b-[1px] border-gray-300">
          <form className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="w-full">
              <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Search..." required></input>
            </div>
            <button type="submit" className="p-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
          <button type="button" className="w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-2 mb-2">Add New</button>
        </div>
        <div className="overflow-auto">
          <ul className="space-y-2 pt-2">
            {
              records.map((record, index) => {
                return <li key={`record-${index}`} onClick={() => handleClick(index)}>
                  <input type="radio" id={`record-${index}`} name="job" value="job-1" className="hidden peer" required></input>
                  <label htmlFor={`record-${index}`} className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 ">
                    <div className="block">
                      <div className="w-full text-lg font-semibold">{record.url}</div>
                      <div className="w-full text-gray-500 text-ellipsis">{record.email}</div>
                    </div>
                    <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" /></svg>
                  </label>
                </li>
              })
            }
          </ul>
        </div>
      </div>
    </>
  )
}

// eslint-disable-next-line react/prop-types
function Modal({ visible, record, index, onClose }) {

  console.log('visible', visible)
  console.log('records', record)
  console.log('index', index)

  if (!visible) {
    return null
  }

  return (
    <div id="modal" tabIndex="-1" aria-hidden="true" className="flex font-['DM_Sans'] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center w-full md:inset-0 h-full bg-slate-50/80">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-lg">
          <div className="p-4 md:p-5">
            <form className="space-y-3" onSubmit={(event) => { event.preventDefault(); onClose() }}>
              <div>
                <label htmlFor="email" className="block text-sm text-gray-900 pl-1.5">Email</label>
                {/* eslint-disable-next-line react/prop-types */}
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" defaultValue={record?.email} required></input>
              </div>
              <div>
                <label htmlFor="username" className="block text-sm text-gray-900 pl-1.5">Username</label>
                <input type="text" name="username" id="username" placeholder="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required></input>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm text-gray-900 pl-1.5">Password</label>
                <input type="password" name="password" id="password" placeholder="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required></input>
              </div>
              <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('options-screen')
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false)
  const [showFileUploadModal, setShowFileUploadModal] = useState(false)
  const [password, setPassword] = useState('')

  return (
    currentScreen == 'options-screen'
      ? <>
        {console.log('password', password)}
        <PasswordModal 
          isVisible={isPasswordModalVisible}
          setIsVisible={setIsPasswordModalVisible}
          setGlobalPassword={setPassword}
          onClose={() => {setCurrentScreen('records-screen')}
        }></PasswordModal>
        <OptionsScreen onClick={() => setIsPasswordModalVisible(true)}></OptionsScreen>
      </>
      : <div>
        {console.log('password', password)}
        File Upload and Other
        </div>
  )
  // return currentScreen == 'upload-screen'
  //   ? <UploadScreen onSave={() => setCurrentScreen('main-screen')}></UploadScreen>
  //   : <MainScreen></MainScreen>
}
