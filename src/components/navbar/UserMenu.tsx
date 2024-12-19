import { Session } from "next-auth";

type UserMenuProps = {
	user: Session["user"];
};

export default function UserMenu({
	user
}: UserMenuProps) {
	
}