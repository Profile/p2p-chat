import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

export function SearchInList () {
    return <div>
        <label htmlFor="main-search" className="bg-gray-900 flex items-center px-2 py-2 rounded">
            <input id="main-search" className="w-full bg-gray-800 rounded text-white px-2 py-1" placeholder="Jane Doe"/>
            <div className="ml-3 mr-3 w-5">
                <FontAwesomeIcon icon={faSearch} color="white" />
            </div>
        </label>
    </div>
}