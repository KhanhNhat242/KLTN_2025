import { useEffect, useState } from 'react'
import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop'
import downloadicon from '../assets/downloadicon.png'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { setBills, updateTrip } from '../redux/billSlice'
import { useNavigate } from 'react-router-dom'
import type { Bill as BillType } from '../interface/Interface'
import Excel from 'exceljs'
import { saveAs } from 'file-saver'
import FilterBill from '../components/FilterBill'

const Bill = () => {
    const [count, setCount] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')

    const token = useSelector((state: RootState) => state.auth.accessToken)
    const dispatch = useDispatch()
    const bills = useSelector((state: RootState) => state.bill)
    const navigate = useNavigate()

    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp * 1000)

        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()

        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')

        return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`
    }

    const getData = async () => {
        await axios.get('https://apigateway.microservices.appf4s.io.vn/services/msbooking/api/bookings?page=0&size=15&sort=bookedAt%2Cdesc', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
            },
        })
        .then((res) => {
            console.log(res.data)
            dispatch(setBills(res.data))
        })
        .catch(() => {
            console.log('Get payment-transactions fail!')
        })
    }

    const getTrip = async (id: number) => {
        await axios.get(`https://apigateway.microservices.appf4s.io.vn/services/msroute/api/trips/${id}/detail`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'accept': '*/*',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': '41866a2d-cdc1-4547-9eef-f6d3464f7b6b',
            },
        })
        .then((res) => {
            // console.log(res.data)
            // console.log(res.data.seatLockDTOs)
            // console.log(res.data)
            dispatch(updateTrip({ id: id, trip: res.data.tripDTO}))
        })
        .catch(() => {
            console.log('Get trip fail!')
        })
    }

    const handleExportExcel = async (data: BillType[], fileName: string) => {
        console.log('date', startDate, endDate)

        const now = new Date().toISOString();
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet("Doanh thu bán vé");

        // === HEADER (merge across ALL columns A -> I) ===
        worksheet.mergeCells("A1", "I1");
        worksheet.getCell("A1").value = "Ridehub";
        worksheet.getCell("A1").font = { size: 14, bold: true };
        worksheet.getCell("A1").alignment = { horizontal: "left", vertical: "middle" };

        worksheet.mergeCells("A2", "I2");
        worksheet.getCell("A2").value = `Ngày in: ${new Date().toLocaleDateString("vi-VN")}`;
        worksheet.getCell("A2").alignment = { horizontal: "left" };

        worksheet.addRow([]);
        worksheet.mergeCells("A4", "I4");
        worksheet.getCell("A4").value = "Doanh thu bán vé";
        worksheet.getCell("A4").font = { size: 12, bold: true };
        worksheet.getCell("A4").alignment = { horizontal: "center" };

        worksheet.mergeCells("A5", "C5");
        worksheet.getCell("A5").value = `Từ ngày: ${startDate}`;
        worksheet.mergeCells("D5", "F5");
        worksheet.getCell("D5").value = `Đến ngày: ${endDate}`;

        // add two blank rows so table header will start at row 7
        worksheet.addRow([]); // row 6
        worksheet.addRow([]); // row 7

        // === Set column widths and keys (no automatic header) ===
        worksheet.columns = [
            { key: "id", width: 8 },
            { key: "tripId", width: 10 },
            { key: "bookingCode", width: 20 },
            { key: "route", width: 40 },
            { key: "quantity", width: 12 },
            { key: "totalAmount", width: 16 },
            { key: "bookedAt", width: 22 },
            { key: "expiresAt", width: 22 },
            { key: "status", width: 14 },
        ];

        // === Manually add header row AT CURRENT POSITION (row 7) ===
        const headerRow = worksheet.addRow([
            "ID",
            "Trip ID",
            "Booking Code",
            "Tuyến",
            "Số lượng ghế",
            "Tổng tiền (VND)",
            "Thời gian đặt",
            "Thời hạn thanh toán",
            "Status",
        ]);

        // style header
        headerRow.eachCell((cell) => {
            cell.font = { bold: true };
            cell.alignment = { horizontal: "center", vertical: "middle" };
            cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
            };
            cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF3F3F3" } };
        });

        // === Add data rows (values must follow header order) ===
        let grandTotal = 0;
        data.forEach((b) => {
            const route =
            b.trip?.route?.origin?.address?.ward?.district?.province?.name &&
            b.trip?.route?.destination?.address?.ward?.district?.province?.name
                ? `${b.trip.route.origin.address.ward.district.province.name} - ${b.trip.route.destination.address.ward.district.province.name}`
                : "";

            const row = worksheet.addRow([
            b.id,
            b.tripId,
            b.bookingCode,
            route,
            b.quantity,
            b.totalAmount,
            formatTimestamp(Number(b.bookedAt)),
            formatTimestamp(Number(b.expiresAt)),
            b.status,
            ]);

            // format the money cell (6th cell, index starts at 1)
            const moneyCell = row.getCell(6);
            moneyCell.numFmt = '#,##0'; // no currency symbol, thousands separator
            moneyCell.alignment = { horizontal: "right" };

            // borders for data row
            row.eachCell((cell) => {
            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
            };
            });

            grandTotal += Number(b.totalAmount) || 0;
        });

        // === Add summary row (Total) below data ===
        // add an empty row before summary for spacing
        worksheet.addRow([]);
        const summaryRow = worksheet.addRow(["", "", "", "", "Tổng cộng", grandTotal]);

        // style summary
        summaryRow.getCell(5).font = { bold: true };
        summaryRow.getCell(6).numFmt = "#,##0";
        summaryRow.getCell(6).font = { bold: true };
        summaryRow.getCell(6).alignment = { horizontal: "right" };

        // optionally freeze header pane at row 8 (headers are on row 7)
        worksheet.views = [{ state: "frozen", ySplit: 7 }];

        // === Export ===
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
        });
        saveAs(blob, `${fileName}-${now}.xlsx`);
        };


    useEffect(() => {
        getData()
        console.log(count)
    }, [])

    useEffect(() => {
        if (bills) {
            bills.forEach((b) => {
                if (!b.trip?.route.id) {
                    getTrip(b.tripId)
                }
            })
        }
    }, [bills])

    return (
        <div className='w-full h-full flex flex-row justify-start'>
            <Header />
            <div className='w-full p-[10px]'>
                <HeaderTop />
                <h2 className='text-[20px] text-left font-bold mt-[10px] mb-[10px]'>Quản lý hóa đơn</h2>
                <div className='w-full flex flex-row justify-between items-end mt-[10px]'>
                    <FilterBill setCount={setCount} setSD={setStartDate} setED={setEndDate} />
                    <button className='h-[30%] p-[10px] flex flex-row items-center mr-[10px] mb-[20px] rounded-[10px] cursor-pointer' style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#ccc'}}
                        onClick={() => handleExportExcel(bills, 'Bill')}
                    >
                        <img src={downloadicon} className='size-[20px] mr-[5px]' />
                        <p>Xuất Excel</p>
                    </button>
                </div>
                <div className='mt-[20px]'>
                    <table className="w-full border border-gray-200 text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 border-b">ID</th>
                            <th className="p-3 border-b">Trip ID</th>
                            <th className="p-3 border-b">Booking CODE</th>
                            <th className="p-3 border-b">Tuyến</th> 
                            <th className="p-3 border-b">Số lượng ghế</th>
                            <th className="p-3 border-b">Tổng tiền</th>
                            <th className="p-3 border-b">Thời gian đặt ghế</th>
                            <th className="p-3 border-b">Thời hạn thanh toán</th> 
                            <th className="p-3 border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map((b) => {
                            if (b.id > 1500)
                            return (
                                <tr key={b.id} className="cursor-pointer hover:bg-gray-50" onClick={() => navigate('/bus-detail', { state: { busid: Number(b.trip?.vehicle.id), tripid: b.tripId } })}>
                                    <td className="p-3 border-b">{b.id}</td>
                                    <td className="p-3 border-b">{b.tripId}</td>
                                    <td className="p-3 border-b">{b.bookingCode}</td>
                                    <td className="p-3 border-b">{`${b.trip?.route.origin.address.ward.district.province.name} - ${b.trip?.route.destination.address.ward.district.province.name}`}</td>
                                    <td className="p-3 border-b">{b.quantity}</td>
                                    <td className="p-3 border-b">{(1000*b.totalAmount).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                                    <td className="p-3 border-b">{formatTimestamp(Number(b.bookedAt))}</td>
                                    <td className="p-3 border-b">{formatTimestamp(Number(b.expiresAt))}</td>
                                    <td className="p-3 border-b">{b.status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
    )
}

export default Bill
