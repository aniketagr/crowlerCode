import React from 'react';

const Table = ({ apiResponse }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Movie Url</th>
                    <th>Year</th>
                    <th>Certificate</th>
                    <th>Duration</th>
                    <th>Genre</th>
                    <th>Rating</th>
                    <th>Metascore</th>
                    <th>Gross</th>
                </tr>
            </thead>
            <tbody>
                {(apiResponse.length > 0) ? apiResponse.map((items, index) => {
                    return (
                        <tr key={index}>
                            <td>{items.name}</td>
                            <td>{items.href}</td>
                            <td>{items.movieYear}</td>
                            <td>{items.certificate}</td>
                            <td>{items.runtime}</td>
                            <td>{items.genre}</td>
                            <td>{items.rating}</td>
                            <td>{items.metaScore}</td>
                            <td>{items.gross}</td>
                        </tr>
                    )
                }) : <tr><td colSpan="9">Loading...</td></tr>}
            </tbody>
        </table>
    );
}

export default Table