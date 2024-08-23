import React, { useEffect, useRef, useState } from "react";
import Header from "../../Components/Header/Header";
import { useGetReportQuery } from "../../services/healthIndex.api";
import "./report-page.scss";
import { useLocation, useParams } from "react-router-dom";
import { PDFGenerator } from "@awesome-cordova-plugins/pdf-generator";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { FileOpener } from "@capacitor-community/file-opener";
import { Preloader } from "../../Components/Preloader/Preloader";
import { showToast } from "../../utils/common-functions";
import { Back } from "../../Components/Back/Back";
import HeaderActive from "../../Components/Header-active/Header-active";
//@ts-ignore
import html12pdf from "html2pdf.js";

type LocationProps = {
	state: {
		date: String;
	};
};

let style = `
        <style>
          h1 {
            font-size: 15px;
            font-weight: bold;
            padding: 4px;
          }
          div {
            // padding: 4px;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          td, #customers th {
            border: 1px solid #ddd;
            padding: 8px;
            color: #000000;
          }
          th {
            padding-top: 12px;
            padding-bottom: 12px;
            background-color: #04AA6D;
            color: white;
          }
          tr {
            border: 0px solid;
          }
          tr:nth-child(even) { 
            background-color: #f2f2f2;
          }
          tr:hover {
            background-color: #ddd;
          }
        </style>
      `;

export const ReportPage = () => {
	const reportTemplateRef: React.RefObject<HTMLDivElement> = useRef(null);

	const params = useParams();

	const location = useLocation() as unknown as LocationProps;

	const {
		data: reportData,
		isLoading,
		isError,
	} = useGetReportQuery(Number(params.id));

	const [htmlReport, setHtmlReport] = useState<string>("");

	useEffect(() => {
		setHtmlReport(style + reportData);
	}, [reportData]);

	async function writeFile(fileName: string, fileData: string) {
		Filesystem.writeFile({
			path: fileName,
			data: fileData,
			directory: Directory.Documents,
		}).then(() => {
			Filesystem.getUri({
				directory: Directory.Documents,
				path: fileName,
			}).then(
				(getUriResult) => {
					const path = getUriResult.uri;
					FileOpener.open({ filePath: path, contentType: "application/pdf" })
						.then(() => console.log("File is opened"))
						.catch((error) => console.log("Error openening file", error));
				},
				(error) => {
					console.log(error);
				}
			);
		});
	}

	async function downloadReport() {
		// // генерируем PDF из отчёта
		// PDFGenerator.fromData(htmlReport, { documentSize: 'A4' })
		//   .then((base64) => {
		//     // скачиваем PDF на телефон
		//     writeFile(`report${location.state.date}.pdf`, base64)
		//   })
		//   .catch((err) => console.log(err))
		html12pdf(htmlReport, {
			margin: 10,
			filename: "Отчет_анкеты.pdf",
			image: { type: "jpeg", quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
		});
	}

	if (isError) showToast("Ошибка");

	return (
		<div>
			{window.innerWidth > 500 ? <HeaderActive /> : ""}
			<div className={"report-page"}>
				<Back content={"Отчет"} />
				{isLoading ? (
					<Preloader height={"auto"} />
				) : (
					<>
						<div
							ref={reportTemplateRef}
							className="report-page__content"
							dangerouslySetInnerHTML={{ __html: htmlReport }}
						/>
						<div
							onClick={() => downloadReport()}
							className={"report-page__button"}
						>
							Скачать отчет
						</div>
					</>
				)}
			</div>
		</div>
	);
};
