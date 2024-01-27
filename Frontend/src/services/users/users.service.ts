import { api } from "../index";

export const login = async (data: any) => {
  const email = data.email;
  const password = data.password;
  return await api
    .post(`/users/login`, { email, password })
    .then((response) => response.data);
};

export const checkEmail = async (data: any) => {
  const email = data;
  return await api
    .post(`/users/checkEmail`, { email })
    .then((response) => response.data);
};

export const register = async (data: any) => {
	data.role = "user";
	return await api
		.post(`/users/register`, { data })
		.then((response) => response.data);
};

export const updateUser = async (data: any) => {
	const id = data.id;
	const name = data.name;
	const firstname = data.firstname;
	const age = data.age;
	const sexe = data.sexe;
	const telephone = data.telephone;
	const email = data.email;
	const username = data.username;
	const newemail = data.newemail;
	const oldpassword = data.oldpassword;
	const newpassword = data.newpassword;
	return await api
		.post(`/users/update`, {
			id,
			name,
			firstname,
			age,
			sexe,
			telephone,
			email,
			username,
			newemail,
			oldpassword,
			newpassword,
		})
		.then((response) => response.data);
};

export const deleteUser = async (data: any) => {
	return await api
		.delete("/users/delete", { data: data })
		.then((response) => response.data);
};