"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTOtoUserConverter = void 0;
function UserDTOtoUserConverter(udto) {
    return {
        userId: udto.user_id,
        username: udto.username,
        password: udto.password,
        firstName: udto.first_name,
        lastName: udto.last_name,
        affiliation: udto.affiliation,
        placesVisited: udto.places_visited,
        address: udto.address,
        email: udto.email,
        role: udto.role,
        image: udto.image
    };
}
exports.UserDTOtoUserConverter = UserDTOtoUserConverter;
//# sourceMappingURL=UserDTO-to-Users-converter.js.map