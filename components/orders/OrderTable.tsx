import {Order} from "@/lib/db/schema/orders";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table";
import {Button} from "@/components/ui/button";

interface Props {
    order: Order
}

export default function OrderTable({order}: Props) {
    return (
        <div className="border shadow-sm rounded-lg p-2">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Order</TableHead>
                        <TableHead className="min-w-[150px]">Customer</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">#3210</TableCell>
                        <TableCell>Olivia Martin</TableCell>
                        <TableCell className="hidden md:table-cell">February 20, 2022</TableCell>
                        <TableCell className="text-right">$42.25</TableCell>
                        <TableCell className="text-right">
                            <Button size="sm" variant="outline">
                                View
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">#3209</TableCell>
                        <TableCell>Ava Johnson</TableCell>
                        <TableCell className="hidden md:table-cell">January 5, 2022</TableCell>
                        <TableCell className="text-right">$74.99</TableCell>
                        <TableCell className="text-right">
                            <Button size="sm" variant="outline">
                                View
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">#3204</TableCell>
                        <TableCell>Michael Johnson</TableCell>
                        <TableCell className="hidden md:table-cell">August 3, 2021</TableCell>
                        <TableCell className="text-right">$64.75</TableCell>
                        <TableCell className="text-right">
                            <Button size="sm" variant="outline">
                                View
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}
