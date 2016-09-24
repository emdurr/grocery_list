import React from 'react';
import { Link } from 'react-router';

const MenuListItem = (menu) => (
	<div>
	<h3> <Link to={`menus/${menu.menu.id}`}> {menu.menu.name} </Link> </h3>
	<p> Days Included: {menu.days} | Recipes Included: {menu.recipes} </p>
	</div>
)

export default MenuListItem;